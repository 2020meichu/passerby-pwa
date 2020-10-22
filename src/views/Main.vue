<template lang="pug">
div
  v-app-bar.flex-row(app, height='165', color='darkmode-dark')
    v-col.px-8
      v-row.justify-space-between.mb-6
        avatar(:imgPath='avatar')
        h1.fs-34.darkmode-white--text LOGO
      v-row
        h1.fs-34.darkmode-white--text 你好, 俊豪
  router-view
  v-bottom-navigation(v-model='bottomNav', shift, app, grow, color='primary', background-color='darkmode-dark', height='86', @change='changeRoute')
    v-btn
      span 首頁
      v-icon mdi-home
    v-btn
      span 首頁
      v-icon mdi-map-marker
    v-btn
      span 足跡
      v-icon mdi-shoe-print
    v-btn
      span 設定
      v-icon mdi-cog
</template>

<script lang="ts">
import Avatar from '@/components/Avatar.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Avatar
  }
})
export default class Main extends Vue {
  bottomNav: number = 0
  avatar: string = require('@/assets/img/face_0.png')

  changeRoute(currentNav: number): void {
    let route: string = 'Home'
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
}
</script>

<style lang="scss" scoped>
</style>
