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
              h6.subtitle-1.lh-16.mb-1.darkmode-danger--text {{ mappingLightInfo(result).light + " " + $t('home.label.level') }}
              span.fs-12.lh-16.darkmode-gray--text {{ mappingLightInfo(result).name }}
              span.fs-12.lh-16.darkmode-gray--text 2020.10.20 12:00
              v-divider.my-2
      template(v-else)
        v-row.darkmode-superdark.rounded-b-xl.mt-n4
          v-col.d-flex.justify-end.align-start(cols='2')
            v-icon(small, color='darkmode-yellow') mdi-alert-circle
          v-col(cols='10')
            .d-flex.flex-column
              h6.subtitle-1.lh-16.mb-1.darkmode-yellow--text {{ mappingLightInfo(result).light + " " + $t('home.label.level') }}
              span.fs-12.lh-16.darkmode-gray--text {{ mappingLightInfo(result).name }}
              span.fs-12.lh-16.darkmode-gray--text 2020.10.20 12:00
  div(v-else)
    v-row.darkmode-superdark.rounded-xl.pt-1
      v-col.d-flex.justify-end.align-start(cols='2')
        v-icon(small, color='primary') mdi-check-circle
      v-col(cols='10')
        .d-flex.flex-column
          h6.subtitle-1.lh-16.mb-1.primary--text {{ $t('home.label.light.green') + ' ' + $t('home.label.level') }}
          span.fs-12.lh-16.darkmode-gray--text {{ $t('home.description.light.green') }}
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
        name: this.$t('home.description.standard.infected', { disease: disease.name }) as string,
        light: 'red'
      }
    })
    const redRegion: any = Object.keys(result.red.regions).map((id, index) => {
      const region = this.regions.find((d: any) => String(d.id) === id)
      return {
        name: this.$t('home.description.standard.place', { place: region.name, day: this.rules.red.regions[id] }) as string,
        light: 'red'
      }
    })
    const yellowDisease: any = Object.keys(result.yellow.diseases).map((id) => {
      const disease = this.diseases.find((d: any) => String(d.id) === id)
      return {
        name: this.$t('home.description.standard.infected', { disease: disease.name }) as string,
        light: 'yellow'
      }
    })
    const yellowRegion: any = Object.keys(result.yellow.regions).map((id) => {
      const region = this.regions.find((d: any) => String(d.id) === id)
      return {
        name: this.$t('home.description.standard.place', { place: region.name, day: this.rules.yellow.regions[id] }) as string,
        light: 'yellow'
      }
    })
    this.formatResults = [...redDisease, ...redRegion, ...yellowDisease, ...yellowRegion]
    console.log(result, this.formatResults)
  }

  mappingLightInfo (result: any): any {
    if (result.light === 'red') {
      return {
        light: this.$t('home.label.light.red') as string,
        color: 'darkmode-danger',
        name: result.name
      }
    } else if (result.light === 'yellow') {
      return {
        light: this.$t('home.label.light.yellow') as string,
        color: 'darkmode-yellow',
        name: result.name
      }
    } else {
      return {
        light: this.$t('home.label.light.green') as string,
        color: 'primary',
        name: result.name
      }
    }
  }
}
</script>
