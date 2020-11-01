<template lang="pug">
.root
  v-app-bar.flex-row(app, height='165', color='darkmode-dark', :elevation='elevationChange')
    v-col.px-10
      v-row.justify-space-between.mb-6
        avatar(:imgPath='userAvatar')
        .logo-section.d-flex.justify-end.align-center
          .logo-section__logo.mr-2
          p.logo-section__font.darkmode-dark--white.mb-0 Passerby
      v-row
        component(:is='displayFunctionBar')
  //- component(:is="currentRouteTransitionName")
  v-slide-x-transition(:hide-on-leave='true')
    router-view
  v-bottom-navigation(v-model='bottomNav', app, grow, color='primary', background-color='darkmode-dark', height='86', @change='changeRoute')
    v-btn
      v-icon mdi-home
    v-btn
      v-icon mdi-map-marker
    v-btn
      v-icon mdi-shoe-print
    v-btn
      v-icon mdi-cog
</template>

<script lang="ts">
import Avatar from '@/components/Avatar.vue'
import FunctionBarHome from '@/components/functionBars/FunctionBarHome.vue'
import FunctionBarCheckIn from '@/components/functionBars/FunctionBarCheckIn.vue'
import FunctionBarFootprint from '@/components/functionBars/FunctionBarFootprint.vue'
import FunctionBarSettings from '@/components/functionBars/FunctionBarSettings.vue'

import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  name: 'Main',
  components: {
    Avatar,
    FunctionBarHome,
    FunctionBarCheckIn,
    FunctionBarFootprint,
    FunctionBarSettings
  }
})
export default class Main extends Vue {
  @Getter('user/getAvatar') public userAvatar!: string
  bottomNav = 0
  currentRouteTransitionName = 'v-scroll-x-transition'

  changeRoute (currentNav: number): void {
    let route = 'Home'
    switch (currentNav) {
      case 0:
        route = 'Home'
        break
      case 1:
        route = 'CheckIn'
        break
      case 2:
        route = 'Footprint'
        break
      case 3:
        route = 'Settings'
        break
    }
    this.$router.push({ name: route })
  }

  @Watch('$route.name')
  onRouteChanged (value: string, oldValue: string) {
    if (value === oldValue) {
      return
    }
    if (value === 'Home') {
      this.bottomNav = 0
    } else if (value === 'CheckIn') {
      this.bottomNav = 1
    } else if (value === 'Footprint') {
      this.bottomNav = 2
    } else {
      this.bottomNav = 3
    }
  }

  get displayFunctionBar (): string {
    switch (this.$route.name) {
      case 'Home':
        return 'FunctionBarHome'
      case 'CheckIn':
        return 'FunctionBarCheckIn'
      case 'Footprint':
        return 'FunctionBarFootprint'
      case 'Settings':
        return 'FunctionBarSettings'
      default:
        return 'FunctionBarHome'
    }
  }

  get elevationChange (): number {
    switch (this.$route.name) {
      case 'Home':
        return 0
      default:
        return 4
    }
  }

  @Watch('bottomNav')
  onPropertyChanged (value: number, oldValue: number) {
    if (value - oldValue > 0) {
      this.currentRouteTransitionName = 'v-scroll-x-reverse-transition'
    } else {
      this.currentRouteTransitionName = 'v-scroll-x-transition'
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  height: 100%;
}
.logo-section {
  z-index: 25;
  &__logo {
    width: 14px;
    height: 20px;
    background-image: url('~@/assets/img/passerby-logo-white.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  &__font {
    font-size: 12px;
    font-weight: bold;
    font-family: 'Cabin', sans-serif;
  }
}
</style>
