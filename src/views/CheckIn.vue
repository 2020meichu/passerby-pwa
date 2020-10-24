<template lang="pug">
.root.mx-12
  #map
  .d-flex.flex-column.mt-3
    place-item.mb-3(v-for='place in placeInfos', :key='place.name', :isLastOne='false', :name='place.name', :address='place.address', :distance='place.distance')
    place-item.mb-3(:isLastOne='true', :name='"自行輸入地點"', :address='"屏東縣東港鎮中正路102號"', :distance='0', @click.native='openCheckInForm')
  v-dialog(v-model='isCheckImFormOpen')
    v-card.rounded-20
      v-card-title 請輸入地點名稱
      v-card-text
        v-form(ref='form', v-model='valid', lazy-validation)
          v-text-field(v-model='typeName', type='text', label='地點名稱', color='primary', :rules='nameRule', required)
          v-text-field(type='text', :value='currentAddress', label='現在地址', readonly, color='darkmode-gray', required)
      v-card-actions.justify-end.mt-n7
        v-btn(color='primary', text, @click='isCheckImFormOpen = false') 取消
        v-btn(color='primary', text, @click='conform2CheckIn') 送出
</template>

<script lang="ts">
import PlaceItem from '@/components/checkIn/PlaceItem.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { getDistance } from 'geolib'

interface Request {
  location?: any
  radius?: string
  type?: Array<string>
  placeId?: string
  fields?: Array<string>
  rankBy?: any
  keyword?: string
}

interface PlaceInfo {
  name: string
  address: string
  distance: number
}

@Component({
  name: 'CheckIn',
  components: {
    PlaceItem
  }
})
export default class CheckIn extends Vue {
  @Mutation('feature/TOGGLE_isLoading') public TOOGLE_isLoading!: Function
  valid: boolean = true
  isCheckImFormOpen: boolean = false
  typeName: string = ''
  currentAddress: string = '屏東縣東港鎮中正路102號'
  nameRule: any = [(v: boolean | string) => !!v || '此格為必填']
  placeInfos: Array<PlaceInfo> = []

  $refs!: {
    form: HTMLFormElement
  }

  async mounted() {
    this.TOOGLE_isLoading()
    await this.initMapService()
    this.TOOGLE_isLoading()
  }
  async initMapService(): Promise<void> {
    if (!(window as any).navigator.hasOwnProperty('geolocation')) {
      console.log('no geolocation')
    }

    async function nearbyPromise(service: any, request: Request): Promise<any> {
      return new Promise((resolve, reject) => {
        service.nearbySearch(request, (results: any, status: any) => {
          if (status === (window as any).google.maps.GeocoderStatus.OK) {
            resolve(results)
          } else {
            reject(status)
          }
        })
      })
    }

    async function getDetailsPromise(service: any, request: Request): Promise<any> {
      return new Promise((resolve, reject) => {
        service.getDetails(request, (place: any, status: any) => {
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK) {
            resolve(place)
          } else {
            reject(status)
          }
        })
      })
    }

    async function geocodePromise(position: any): Promise<any> {
      return new Promise((resolve, reject) => {
        const geocoder: any = new (window as any).google.maps.Geocoder()
        geocoder.geocode({ latLng: position }, (results: any, status: any) => {
          if (status === (window as any).google.maps.GeocoderStatus.OK) {
            console.log(results)
            resolve(results[0])
          } else {
            reject(status)
          }
        })
      })
    }

    async function sleep(time: number): Promise<any> {
      return new Promise((resolve) => setTimeout(resolve, time))
    }

    const pos: any = await new Promise((resolve, reject) => {
      ;(window as any).navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const position: any = new (window as any).google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
    const map: any = new (window as any).google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: position,
      zoom: 15
    })
    const service: any = new (window as any).google.maps.places.PlacesService(map)

    const request: Request = {
      location: position,
      radius: '500'
    }

    const draftData: any = await nearbyPromise(service, request)

    this.placeInfos.length = 0
    for (let i = 0; i < draftData.slice(0, 5).length; i++) {
      const data = await getDetailsPromise(service, { placeId: draftData[i].place_id, fields: ['name', 'formatted_address', 'geometry'] })
      const distance = getDistance({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }, { latitude: data.geometry.location.lat(), longitude: data.geometry.location.lng() })
      this.placeInfos.push({
        name: data.name,
        address: data.formatted_address,
        distance
      })
      await sleep(500)
    }

    await geocodePromise(position)

    /*
    function createMarker(place: any, map: any): void {
      const marker = new (window as any).google.maps.Marker({
        map,
        position: place.geometry.location
      })
      const infowindow: any = new (window as any).google.maps.InfoWindow()

      ;(window as any).google.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(place.name)
        infowindow.open(map)
      })
    }
    */
  }
  openCheckInForm(): void {
    this.isCheckImFormOpen = true
  }
  conform2CheckIn() {
    const check: boolean = this.$refs.form.validate()
    if (!check) {
      return
    }
    this.isCheckImFormOpen = false
    this.TOOGLE_isLoading()
    // TODO request api to backend
    this.TOOGLE_isLoading()
  }
}
</script>

<style lang="scss" scoped>
.root {
  height: 100%;
}
#map {
  position: absolute;
  z-index: -1;
  height: 100%;
}
</style>
