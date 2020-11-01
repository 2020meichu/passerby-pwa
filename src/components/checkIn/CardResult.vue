<template lang="pug">
v-card.rounded-20.darkmode-superdark(width='241', height='334', elevation='4')
  v-img.rounded-b-0(:src='mappingLightInfo(light).imgUrl', height='188')
  v-card-title.text-h5.lh-24.px-6(:class='`${mappingLightInfo(light).color}--text`') {{ mappingLightInfo(light).name_zh + "等級" }}
  v-card-text.fs-12.lh-16.text-dot-2.text-justify.px-6 {{ mappingLightInfo(light).description }}
  v-card-actions.justify-center
    v-chip.h-20(x-small, :color='mappingLightInfo(light).color', text-color='darkmode-dark', @click='confirm') 確定
</template>
<script lang="ts">
import BackBtn from '@/components/BackBtn.vue'
import CardLightDetail from '@/components/home/CardLightDetail.vue'
import { Getter, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'

interface lightInfo {
  name_zh: string;
  color: string;
  imgUrl: string;
  description: string;
}

@Component({
  name: 'CardLight',
  components: {
    BackBtn
  }
})
export default class CardLight extends Vue {
  @Getter('configuration/getDiseases') public diseases!: any
  @Getter('configuration/getRegions') public regions!: any
  @Getter('configuration/getRules') public rules!: any
  @Action('user/getCurrentLightInfo') public getCurrentLightInfo!: Function
  isShowDetail = false
  light = 'green'

  async created () {
    const result = await this.getCurrentLightInfo()
    const redDisease: any = Object.keys(result.red.diseases).map((id) => {
      const disease = this.diseases.find((d: any) => String(d.id) === id)
      return {
        name: `確診 ${disease.name}`,
        light: 'red'
      }
    })
    const redRegion: any = Object.keys(result.red.regions).map((id, index) => {
      const region = this.regions.find((d: any) => String(d.id) === id)
      return {
        name: `${this.rules.red.regions[id]}天內從${region.name}出入境`,
        light: 'red'
      }
    })
    const red = [...redDisease, ...redRegion]

    if (red.length > 0) {
      return (this.light = 'red')
    }

    const yellowDisease: any = Object.keys(result.yellow.diseases).map((id) => {
      const disease = this.diseases.find((d: any) => String(d.id) === id)
      return {
        name: `確診 ${disease.name}`,
        light: 'yellow'
      }
    })
    const yellowRegion: any = Object.keys(result.yellow.regions).map((id) => {
      const region = this.regions.find((d: any) => String(d.id) === id)
      return {
        name: `${this.rules.yellow.regions[id]}天內從${region.name}出入境`,
        light: 'yellow'
      }
    })
    const yellow = [...yellowDisease, ...yellowRegion]

    if (yellow.length > 0) {
      return (this.light = 'red')
    }
  }

  confirm (): void {
    this.$router.replace('/')
  }

  mappingLightInfo (light: string): lightInfo {
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
