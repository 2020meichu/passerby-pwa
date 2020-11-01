<template lang="pug">
div
  div(v-if='formatResults.length !== 0')
    template(v-for='(result, index) in formatResults')
      template(v-if='index + 1 !== formatResults.length')
        v-row.darkmode-superdark.rounded-t-xl.pt-1
          v-col.d-flex.justify-end.align-start(cols='2')
            v-icon(small, color='darkmode-danger') mdi-alert-circle
          v-col(cols='10')
            .d-flex.flex-column
              h6.subtitle-1.lh-16.mb-1.darkmode-danger--text {{ mappingLightInfo(result).light_zh + "等級" }}
              span.fs-12.lh-16.darkmode-gray--text {{ mappingLightInfo(result).name }}
              span.fs-12.lh-16.darkmode-gray--text 2020.10.20 12:00
              v-divider.my-2
      template(v-else)
        v-row.darkmode-superdark.rounded-b-xl.mt-n4
          v-col.d-flex.justify-end.align-start(cols='2')
            v-icon(small, color='darkmode-yellow') mdi-alert-circle
          v-col(cols='10')
            .d-flex.flex-column
              h6.subtitle-1.lh-16.mb-1.darkmode-yellow--text {{ mappingLightInfo(result).light_zh + "等級" }}
              span.fs-12.lh-16.darkmode-gray--text {{ mappingLightInfo(result).name }}
              span.fs-12.lh-16.darkmode-gray--text 2020.10.20 12:00
  div(v-else)
    v-row.darkmode-superdark.rounded-xl.pt-1
      v-col.d-flex.justify-end.align-start(cols='2')
        v-icon(small, color='primary') mdi-check-circle
      v-col(cols='10')
        .d-flex.flex-column
          h6.subtitle-1.lh-16.mb-1.primary--text 綠燈等級
          span.fs-12.lh-16.darkmode-gray--text 無相關病史、出國史、接觸史
          span.fs-12.lh-16.darkmode-gray--text 2020.10.25 12:00
</template>

<script lang='ts'>
import axios from '@/plugins/axios'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

interface DepartureRecord {
  date: Date;
  to: string;
}

interface ArrivalRecord {
  date: Date;
  from: string;
}

interface InfectedRecord {
  disease_id: number;
  date: Date;
  recover: boolean;
}

interface QuarantineRecord {
  start: Date;
  end: Date;
}

@Component({
  name: 'CardLightDetail'
})
export default class CardLightDetail extends Vue {
  @Getter('configuration/getDiseases') public diseases!: any
  @Getter('configuration/getRegions') public regions!: any
  @Getter('configuration/getRules') public rules!: any
  @Action('user/getCurrentLightInfo') public getCurrentLightInfo!: Function

  matchedRed = true
  matchedYellow = true
  matchedGreen = false
  formatResults: any = []

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
    this.formatResults = [...redDisease, ...redRegion, ...yellowDisease, ...yellowRegion]
    console.log(result, this.formatResults)
  }

  mappingLightInfo (result: any): any {
    if (result.light === 'red') {
      return {
        light_zh: '紅燈',
        color: 'darkmode-danger',
        name: result.name
      }
    } else if (result.light === 'yellow') {
      return {
        light_zh: '黃燈',
        color: 'darkmode-yellow',
        name: result.name
      }
    } else {
      return {
        light_zh: '綠燈',
        color: 'primary',
        name: result.name
      }
    }
  }
}
</script>
