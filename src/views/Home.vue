<template lang="pug">
.root
  v-tabs.pl-10.mb-8(v-model='currentTab', background-color='darkmode-dark', height='20')
    v-tab.pb-1 最新消息
    v-tab.pb-1 個人狀態
  v-tabs-items.darkmode-dark(v-model='currentTab')
    v-tab-item
      .list.pl-10
        card-news
        card-news
    v-tab-item
      .d-flex.justify-center
        card-light
</template>

<script lang='ts'>
import CardNews from '@/components/home/CardNews.vue'
import CardLight from '@/components/home/CardLight.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Home',
  components: {
    CardNews,
    CardLight
  }
})
export default class Home extends Vue {
  currentTab: number = 0
}
</script>

<style lang="scss" scoped>
.root {
  height: 100%;
  overflow: scroll;
}

.list {
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  column-gap: 21px;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    &::after {
      content: '';
      width: 22px;
    }
  }
}
.theme--dark.v-tabs .v-tab--active:hover::before, .theme--dark.v-tabs .v-tab--active::before {
  opacity: 0 !important;
}
// .v-tabs::v-deep .v-tabs-slider-wrapper {
//   bottom: 8px !important;
// }
</style>
