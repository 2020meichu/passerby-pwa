<template lang="pug">
div
  div(v-if='matchedRed && matchedYellow')
    v-row.darkmode-superdark.rounded-t-xl.pt-1
      v-col.d-flex.justify-end.align-start(cols='2')
        v-icon(small, color='darkmode-danger') mdi-check-circle
      v-col(cols='10')
        .d-flex.flex-column
          h6.subtitle-1.lh-16.mb-1.darkmode-danger--text 紅燈等級
          span.fs-12.lh-16.darkmode-gray--text 確診 嚴重特殊傳染性肺炎 (COVID-19)
          span.fs-12.lh-16.darkmode-gray--text 2020.10.01 12:00
          v-divider.my-2
    v-row.darkmode-superdark.rounded-b-xl.mt-n4
      v-col.d-flex.justify-end.align-start(cols='2')
        v-icon(small, color='darkmode-yellow') mdi-check-circle
      v-col(cols='10')
        .d-flex.flex-column
          h6.subtitle-1.lh-16.mb-1.darkmode-yellow--text 黃燈等級
          span.fs-12.lh-16.darkmode-gray--text 確診 嚴重特殊傳染性肺炎 (COVID-19)
          span.fs-12.lh-16.darkmode-gray--text 2020.10.01 12:00
  div(v-else)
    v-row.darkmode-superdark.rounded-xl.pt-1
      v-col.d-flex.justify-end.align-start(cols='2')
        v-icon(small, color='primary') mdi-check-circle
      v-col(cols='10')
        .d-flex.flex-column
          h6.subtitle-1.lh-16.mb-1.primary--text 綠燈等級
          span.fs-12.lh-16.darkmode-gray--text 確診 嚴重特殊傳染性肺炎 (COVID-19)
          span.fs-12.lh-16.darkmode-gray--text 2020.10.01 12:00
</template>

<script lang='ts'>
import axios from '@/plugins/axios'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'



interface DepartureRecord {
  date: Date,
  to: string
}

interface ArrivalRecord {
  date: Date,
  from: string
}

interface InfectedRecord {
  disease_id: Number,
  date: Date,
  recover: boolean
}

interface QuarantineRecord {
  start: Date,
  end: Date
}

@Component({
  name: 'CardLightDetail'
})
export default class CardLightDetail extends Vue {
  @Action('user/getCurrentLightInfo') public getCurrentLightInfo!: Function

  matchedRed: boolean = true
  matchedYellow: boolean = true
  matchedGreen: boolean = false

  async mounted () {
    const result = await this.getCurrentLightInfo()
  }
}
</script>
