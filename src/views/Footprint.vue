<template lang="pug">
  div.foot-print-root
    v-btn.darkmode-superdark.rounded-btn(width='42', height='42', elevation='4', icon @click="isDisplayDatePicker = !isDisplayDatePicker")
      v-icon mdi-calendar
    v-fade-transition(mode="out-in" hide-on-leave)
      v-chip.time-chip.black(v-show="featureFootprint.currentTab === 0" small) {{ filterDate(targetDate) }}
    v-fade-transition(mode="out-in" hide-on-leave)
      div#map(v-show="featureFootprint.currentTab === 0")
    v-overlay(:z-index="105" :opacity="0.7" :value="isDisplayDatePicker")
      v-date-picker.rounded-20(v-model="pickDate" color="primary" )
    v-fade-transition(mode="out-in" hide-on-leave)
      div#timeline.pr-12.pl-12.pt-6.mb-6(v-show="featureFootprint.currentTab === 1")
        div(v-for="(key, index) of Object.keys(userFootprintsSorted)", :key="`time-${key}-${index}`")
          h1.fs-24.fw-normal.darkmode-white--text {{ key }}
          v-timeline.mt-4(dense)
            v-timeline-item(v-for="(footprint, fidx) of userFootprintsSorted[key]", :key="`timeline-${footprint.longitude}-${footprint.latitude}-${fidx}`" small fill-dot)
              v-card.pa-1.darkmode-superdark
                v-card-title.fs-12.fw-normal.pa-1 {{ footprint.location }}
                v-card-text.fs-10.fh-14.pa-1
                  label {{ footprint.address }}
                  br
                  time {{ filterDateAndTime(footprint.time) }}
</template>

<script lang="ts">
import axios from '@/plugins/axios.ts'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Mutation, Getter } from 'vuex-class'
import Popup from '@/plugins/popup'

// The interface of coord
interface Coord {
  longitude: number;
  latitude: number;
}
interface FootprintRecord {
  longitude: number;
  latitude: number;
  location: string;
  address: string;
  time: Date;
}
interface FeatureFootprint {
  currentTab: number;
  isMapLoaded: boolean;
}

interface FootprintMakrerRecord {
  popup: Popup;
  marker: any;
}

@Component({
  name: 'Footprint'
})

export default class Footprint extends Vue {
  @Getter('feature/getFootprint') public featureFootprint!: FeatureFootprint
  @Getter('user/getFootprints') public userFootprints!: Array<FootprintRecord>
  @Mutation('feature/TOGGLE_isLoading') public TOGGLE_isLoading!: Function
  @Mutation('feature/SET_footprintIsMapLoaded') public SET_footprintIsMapLoaded!: Function

  // Variables declaration
  map: any = null
  targetDate: Date = new Date()
  pickDate = ''
  isDisplayDatePicker = false
  currentMarkers: Array<FootprintMakrerRecord> = []
  currentPosition: Coord = {
    longitude: 0,
    latitude: 0
  }

  async mounted () {
    if (this.featureFootprint.currentTab === 0 && !this.featureFootprint.isMapLoaded) {
      this.TOGGLE_isLoading()
    }
    // If there is no footprints, then display the user's current position
    // Or display the last footprint's location
    let targetPosition: Coord

    // Obtain the current position
    const position: any = await new Promise((resolve, reject) => {
      ;(window as any).navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    this.currentPosition.longitude = position.coords.longitude
    this.currentPosition.latitude = position.coords.latitude
    console.log(position)

    if (this.userFootprints.length === 0) {
      // Get the user's current position
      targetPosition = this.currentPosition
    } else {
      targetPosition = {
        latitude: this.userFootprints[this.userFootprints.length - 1].latitude,
        longitude: this.userFootprints[this.userFootprints.length - 1].longitude
      }
      this.targetDate = new Date(this.userFootprints[this.userFootprints.length - 1].time)
    }
    // Display the google map on the map container
    const mapElement: HTMLElement = document.querySelector('#map') as HTMLElement

    this.map = new (window as any).google.maps.Map(mapElement, {
      center: { lat: targetPosition.latitude, lng: targetPosition.longitude },
      zoom: 12,
      disableDefaultUI: true,
      mapTypeControl: false,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
    })
    const loadedHandler = (): void => {
      if (!this.featureFootprint.isMapLoaded) {
        this.TOGGLE_isLoading()
        this.SET_footprintIsMapLoaded(true)
      }
    }
    this.map.addListener('tilesloaded', loadedHandler)
    // Draw the markers
    this.drawMarkers()
    this.map.addListener('click', (): void => {
      this.currentMarkers.forEach((target: FootprintMakrerRecord): void => {
        target.popup.hide()
      })
    })
  }

  drawMarkers () {
    const filteredRecords = this.userFootprints.filter((target: FootprintRecord): boolean => {
      const targetTime = new Date(target.time)
      return targetTime.getFullYear() === this.targetDate.getFullYear() &&
        targetTime.getMonth() === this.targetDate.getMonth() &&
        targetTime.getDate() === this.targetDate.getDate()
    })
    this.currentMarkers = filteredRecords.map((target: FootprintRecord): any => {
      // Map the data into coord structure
      const position: any = new (window as any).google.maps.LatLng(target.latitude, target.longitude)
      const ele: HTMLElement = document.createElement('div')
      ele.className = 'pa-1 darkmode-superdark v-card theme--dark'
      ele.innerHTML = `<div class="v-card__title fs-12 fw-normal pa-1">${target.location}</div>
        <div class="v-card__text fs-10 fh-14 pa-1">
          <label>${target.address}</label>
          <br/>
          <time>${this.filterDateAndTime(target.time)}</time>
        </div>
      `
      const popupWindow = new Popup(position, ele)
      popupWindow.setMap(this.map)

      const marker = new (window as any).google.maps.Marker({
        position: position,
        map: this.map,
        icon: require('@/assets/img/marker.png')
      })
      marker.addListener('click', (): void => {
        popupWindow.show()
      })
      return {
        popup: popupWindow,
        marker
      }
    })
    const userPosition = new (window as any).google.maps.LatLng(this.currentPosition.latitude, this.currentPosition.longitude)
    this.currentMarkers.push({
      popup: new Popup(userPosition, document.createElement('div')),
      marker: new (window as any).google.maps.Marker({
        position: userPosition,
        map: this.map,
        icon: require('@/assets/img/user-marker.svg')
      })
    })
    // Center zoom of map to cover all visible markers
    if (this.currentMarkers.length > 0) {
      const bounds = new (window as any).google.maps.LatLngBounds()
      this.currentMarkers.forEach((target: FootprintMakrerRecord): void => {
        bounds.extend(target.marker.getPosition())
      })
      this.map.setCenter(bounds.getCenter())
      this.map.fitBounds(bounds)
      this.map.setZoom(this.map.getZoom() - 1)
    }
  }

  filterDateAndTime (value: Date): string {
    const time = new Date(value).toISOString().split('T')[1].split('.')[0].split(':').slice(0, 2).join(':')
    const date = new Date(value).toISOString().split('T')[0]
    return `${date} ${time}`
  }

  filterDate (value: Date): string {
    return new Date(value).toISOString().split('T')[0]
  }

  get userFootprintsSorted (): any {
    const weekdays: Array<string> = new Array(7)
    weekdays[0] = 'Sun.'
    weekdays[1] = 'Mon.'
    weekdays[2] = 'Tue.'
    weekdays[3] = 'Wed.'
    weekdays[4] = 'Thu.'
    weekdays[5] = 'Fri.'
    weekdays[6] = 'Sat.'

    const result: any = {}
    this.userFootprints.forEach((target: FootprintRecord): void => {
      const targetTime = new Date(target.time)
      const key = `${targetTime.toISOString().split('T')[0].replace('-', '.')} ${weekdays[targetTime.getDay()]}`
      if (!result[key]) { result[key] = [] }
      result[key].push(target)
    })
    return result
  }

  @Watch('pickDate')
  onPropertyChanged (value: string, oldValue: string) {
    if (value === oldValue) {
      return
    }
    this.targetDate = new Date(value)
    // Remove all markers on the map
    this.currentMarkers.forEach((target: FootprintMakrerRecord): void => {
      target.popup.setMap(null)
      target.marker.setMap(null)
    })
    this.drawMarkers()
    this.isDisplayDatePicker = false
  }
}
</script>

<style lang="scss" scoped>
.foot-print-root {
  height: 100%;
  overflow: scroll;
}

  #map {
    height: 100%;
  }
  .rounded-btn {
    position: fixed;
    top: 178px;
    right: 16px;
    z-index: 100;
    border-radius: 10px;
  }
  .time-chip {
    position: absolute;
    top: 12px;
    left: 150px;
    z-index: 100;
  }

  .v-application--is-ltr .v-timeline--dense:not(.v-timeline--reverse):before {
    left: 12px !important;
  }
  .v-timeline-item::v-deep > .v-timeline-item__divider {
    min-width: 48px;
    justify-content: flex-start !important;
    left: 5px !important;
  }
  .v-timeline-item::v-deep > .v-timeline-item__body {
    max-width: calc(100% - 48px);
    min-width: 120px;
  }

  .v-timeline-item::v-deep .v-timeline-item__dot--small {
    width: 16px !important;
    height: 16px !important;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .v-picker::v-deep .v-picker__title__btn {
    color: #263238;
  }
</style>
