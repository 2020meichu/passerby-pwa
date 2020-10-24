<template lang="pug">
.root.mx-12
  #map
  .d-flex.flex-column.mt-3
    place-item.mb-3(v-for='i in 4', :key='`item-${i}`', :isLastOne='false', :name='"安泰醫療社團法人安泰醫院"', :address='"屏東縣東港正中正路一段210號, Pin..."', :distance='70')
    place-item.mb-3(:isLastOne='true', :name='"自行輸入地點"', :address='"屏東縣東港鎮中正路102號"', :distance='0', @click.native='openCheckInForm')
  v-dialog(v-model='isCheckImFormOpen')
    v-card.rounded-20
      v-card-title 請輸入地點名稱
      v-card-text
        v-form(ref='form', v-model='valid', lazy-validation)
          v-text-field(v-model='typeAddress', type='text', label='地點名稱', color='primary', :rules='nameRule', required)
          v-text-field(type='text', :value='currentAddress', label='現在地址', readonly, color='darkmode-gray', required)
      v-card-actions.justify-end.mt-n7
        v-btn(color='primary', text, @click='isCheckImFormOpen = false') 取消
        v-btn(color='primary', text, @click='conform2CheckIn') 送出
</template>

<script lang="ts">
import PlaceItem from '@/components/checkIn/PlaceItem.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

interface Request {
  location: any
  radius: string
  type?: Array<string>
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
  typeAddress: string = ''
  currentAddress: string = '屏東縣東港鎮中正路102號'
  nameRule: any = [(v: boolean | string) => !!v || '此格為必填']

  mounted() {
    //    this.initMapService()
  }

  async initMapService(): Promise<void> {
    let pos: any
    if ('geolocation' in (window as any).navigator) {
      pos = await new Promise((resolve, reject) => {
        ;(window as any).navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    }

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

    service.nearbySearch(request, callback)

    function callback(results: any, status: any): void {
      console.log(results)
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i], map)
      }
    }

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
  }
  openCheckInForm(): void {
    this.isCheckImFormOpen = true
  }

  $refs!: {
    form: HTMLFormElement
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