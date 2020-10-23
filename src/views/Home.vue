<template lang="pug">
.root
  v-tabs.pl-10.mb-8(v-model='currentTab', background-color='darkmode-dark', height='20')
    v-tab 最新消息
    v-tab 個人狀態
  v-tabs-items.darkmode-dark(v-model='currentTab')
    v-tab-item
      .list.pl-10
        card-news
        card-news
    v-tab-item
</template>

<script lang='ts'>
import CardNews from '@/components/home/CardNews.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    CardNews
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

</style>
