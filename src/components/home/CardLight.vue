<template lang="pug">
v-card.rounded-20(width='241', height='334', elevation='4')
  v-img.rounded-b-0(:src='mappingLightInfo(light).imgUrl', height='188')
  v-card-title.text-h5.lh-24(:class='`${mappingLightInfo(light).color}--text`') {{ mappingLightInfo(light).name_zh + "等級" }}
  v-card-text.fs-12.lh-16.text-dot-2.text-justify {{ mappingLightInfo(light).description }}
  v-card-actions.justify-center
    v-dialog(v-model='isShowDetail', fullscreen, hide-overlay, transition='dialog-bottom-transition')
      template(v-slot:activator='{ on, attrs }')
        v-chip.h-20(x-small, :color='mappingLightInfo(light).color', text-color='darkmode-dark', v-on='on', v-bind='attrs') 詳細狀態
      v-card.darkmode-dark
        v-app-bar(app, color='darkmode-dark', height='104', elevation='4')
          back-btn(@click.native='backHandler')
          v-spacer
          v-icon mdi-cog
        v-main.mx-8
          v-card-title.text-h5.darkmode-white--text 個人詳細狀態
          v-card-text
            card-light-detail
            .d-flex.justify-space-between.align-center.my-5
              h5.text-h5.darkmode-white--text 分級標準
              span.h-20.text-captions.primary--text 2020.10.20 14:30
            v-simple-table.darkmode-dark(dense)
              template(v-slot:default)
                thead
                  tr
                    th.text-left 項目
                    th.text-right 分級
                tbody
                  tr(v-for='item in items', :key='item.name')
                    td {{ item.name }}
                    td.text-right(:class='`${mappingLightInfo(item.light).color}--text`') {{ mappingLightInfo(item.light).name_zh }}
</template>
<script lang="ts">
import BackBtn from '@/components/BackBtn.vue'
import CardLightDetail from '@/components/home/CardLightDetail.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

interface lightInfo {
  name_zh: string
  color: string
  imgUrl: string
  description: string
}

interface item {
  name: string
  light: string
}
@Component({
  name: 'CardLight',
  components: {
    BackBtn,
    CardLightDetail
  }
})
export default class CardLight extends Vue {
  @Prop(String) readonly light!: string
  isShowDetail: boolean = false
  items: Array<item> = [
    {
      name: 'aaad',
      light: 'red'
    },
    {
      name: 'bb',
      light: 'red'
    },
    {
      name: 'cc',
      light: 'yellow'
    },
    {
      name: 'dd',
      light: 'green'
    }
  ]

  backHandler(): void {
    this.isShowDetail = !this.isShowDetail
  }

  mappingLightInfo(light: string): lightInfo {
    if (light === 'red') {
      return {
        name_zh: '紅燈',
        color: 'darkmode-danger',
        imgUrl: require('@/assets/img/red-light-img.png'),
        description: '傳染病帶原者、疑似帶原者或具接觸史、出國史之高風險族群，需實施隔離'
      }
    } else if (light === 'yellow') {
      return {
        name_zh: '黃燈',
        color: 'darkmode-yellow',
        imgUrl: require('@/assets/img/yellow-light-img.png'),
        description: '非高風險，但具一定傳染力，需配戴口罩或其他防護之醫療用品，以杜絕傳染'
      }
    } else {
      return {
        name_zh: '綠燈',
        color: 'primary',
        imgUrl: require('@/assets/img/green-light-img.png'),
        description: '低風險族群。現階段無傳染帶原，且無接觸、出國史'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.h-20::v-deep,
.h-20::v-deep > span {
  height: 20px !important;
}
</style>