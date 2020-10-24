<template lang="pug">
.root
  v-app-bar.flex-row(app, height='165', color='darkmode-dark', elevate-on-scroll)
    v-col.px-10
      v-row.justify-space-between.mb-6
        avatar(:imgPath='avatar')
        h1.fs-34.darkmode-white--text LOGO
      v-row
        h1.fs-34.darkmode-white--text 你好, 俊豪
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
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Main',
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
.root {
  height: 100%;
}
</style>
