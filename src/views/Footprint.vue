<template lang="pug">
.foot-print-root
  #map
</template>

<script lang="ts">
import axios from '@/plugins/axios.ts'
import { Component, Vue } from 'vue-property-decorator'

// The interface of coords
interface Coords {
  lng: Number
  lat: Number
}
interface FootprintRecord {
  longitude: Number
  latitude: Number
  name: string
}

@Component({
  name: 'Footprint'
})
export default class Footprint extends Vue {
  // Variables declaration
  map: any = null
  footprints: Array<FootprintRecord> = []

  async mounted() {
    // // TODO: Obtain the footprints data from backend server
    // this.footprints = await axios.get('')
    // The position to display
    // If there is no footprints, then display the user's current position
    // Or display the last footprint's location
    let targetPosition: Coords = {
      lng: 120.8966433,
      lat: 24.7834628
    }

    if (this.footprints.length === 0) {
      // Get the user's current position
      if ('geolocation' in (window as any).navigator) {
        // Get the geolocation
        ;(window as any).navigator.geolocation.getCurrentPosition(function (position: any): void {
          targetPosition.lng = position.coords.longitude
          targetPosition.lat = position.coords.latitude
        })
      }
    } else {
      const targetPosition: Object = this.footprints[this.footprints.length - 1]
    }
    // Display the google map on the map container
    const mapElement: HTMLElement = document.querySelector('#map') as HTMLElement
    this.map = new (window as any).google.maps.Map(mapElement, {
      center: targetPosition,
      zoom: 12,
      disableDefaultUI: true,
      mapTypeControl: false,
      styles: [
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
</style>