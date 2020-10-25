<template lang="pug">
.root.mx-12
  #map
  .d-flex.flex-column.mt-3
    place-item.mb-3(v-for='place in placeInfos', :key='place.name', :isLastOne='false', :name='place.name', :address='place.address', :distance='place.distance', @click.native='checkInAction(place)')
    place-item.mb-3(:isLastOne='true', :name='"自行輸入地點"', :address='"無"', :distance='0', @click.native='openCheckInForm')
  v-dialog(v-model='isCheckImFormOpen')
    v-card.rounded-20
      v-card-title 請輸入地點名稱
      v-card-text
        v-form(ref='form', v-model='valid', lazy-validation)
          v-text-field(v-model='typeName', type='text', label='地點名稱', color='primary', :rules='nameRule', required)
          v-text-field(type='text', :value='shortPosition', label='當前座標', readonly, color='darkmode-gray', required)
      v-card-actions.justify-end.mt-n7
        v-btn(color='primary', text, @click='isCheckImFormOpen = false') 取消
        v-btn(color='primary', text, @click='conform2CheckIn') 送出
</template>

<script lang="ts">
import PlaceItem from '@/components/checkIn/PlaceItem.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, Action } from 'vuex-class'
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
  distance?: number
}

interface Position {
  latitude: number
  longitude: number
}

@Component({
  name: 'CheckIn',
  components: {
    PlaceItem
  }
})
export default class CheckIn extends Vue {
  @Mutation('feature/TOGGLE_isLoading') public TOOGLE_isLoading!: Function
  @Action('user/checkIn') public checkIn!: Function

  valid: boolean = true
  isCheckImFormOpen: boolean = false
  typeName: string = ''
  nameRule: any = [(v: boolean | string) => !!v || '此格為必填']
  placeInfos: Array<PlaceInfo> = []
  currentPosition: Position = {
    latitude: 0,
    longitude: 0
  }
  hasCheckIned: boolean = false

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

    async function sleep(time: number): Promise<any> {
      return new Promise((resolve) => setTimeout(resolve, time))
    }

    const pos: any = await new Promise((resolve, reject) => {
      ;(window as any).navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    this.currentPosition = Object.assign(this.currentPosition, { latitude: pos.coords.latitude, longitude: pos.coords.longitude })

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
  }

  get shortPosition(): string {
    const longitude: number = Math.floor(this.currentPosition.longitude * 100) / 100
    const latitude: number = Math.floor(this.currentPosition.latitude * 100) / 100
    return `(${latitude}, ${longitude})`
  }
  openCheckInForm(): void {
    this.isCheckImFormOpen = true
  }
  async conform2CheckIn() {
    const check: boolean = this.$refs.form.validate()
    if (!check) {
      return
    }
    this.isCheckImFormOpen = false
    this.TOOGLE_isLoading()
    await this.checkInAction({
      name: this.typeName,
      address: ''
    })
    this.TOOGLE_isLoading()
  }
  async checkInAction(place: PlaceInfo): Promise<any> {
    try {
      this.TOOGLE_isLoading()
      await this.checkIn({
        longitude: this.currentPosition.longitude,
        latitude: this.currentPosition.latitude,
        location: place.name,
        address: place.address
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.TOOGLE_isLoading()
    }
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
