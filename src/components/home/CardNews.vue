<template lang="pug">
v-card.rounded-20(width='241', height='334', elevation='4' color="darkmode-superdark")
  v-card-title.text-body-1.darkmode-white--text.px-6 新冠肺炎4千萬人確診 學者估疫情明年2月才受控
  v-card-text.px-6
    .d-flex.justify-space-between.mt-n3.mb-6
      v-chip.h-20(x-small, color='rgba(0, 0, 0, 0.8)', text-color='primary') 衛生福利部
      span.time-display.h-20.text-captions.primary--text 2020.10.20 14:30
    div
      p.text-caption.text-wrapper.text-dot-10.text-justify.mb-0.lh-16 {{ article }}
  v-card-actions.justify-end.px-6
    v-dialog(v-model='isShowDetail', fullscreen, hide-overlay, transition='dialog-bottom-transition')
      template(v-slot:activator='{ on, attrs }')
        v-chip.h-20(x-small, color='primary', text-color='darkmode-dark', v-on='on', v-bind='attrs') 繼續閱讀
      v-card.darkmode-dark
        v-app-bar(fixed color='darkmode-dark', height='104', elevation='4').pr-8
          back-btn(@click.native='backHandler')
          v-spacer
          .logo-section.d-flex.justify-end.align-center
            .logo-section__logo.mr-2
            p.logo-section__font.darkmode-dark--white.mb-0 Passerby
        .mt-21.mx-6
          v-card-title.text-h5.darkmode-white--text 新冠肺炎4千萬人確診 學者估疫情明年2月才受控
          v-card-text
            .d-flex.justify-space-between.mt-n3.mb-6
              v-chip.h-32(color='rgba(0, 0, 0, 0.8)', text-color='primary') 衛生福利部
              span.h-32.lh-32.text-subtitle-2.primary--text 2020.10.20 14:30
            v-img.mb-5(:src='img', height='157')
              template(v-slot:placeholder)
                v-row.fill-height.ma-0(align='center', justify='center')
                  v-progress-circular(indeterminate, color='grey lighten-5')
            div
              p.text-body-1.text-wrapper.text-justify.mb-0.lh-24 {{ article }}
</template>

<script lang="ts">
import BackBtn from '@/components/BackBtn.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'CardNews',
  components: {
    BackBtn
  }
})
export default class CardNews extends Vue {
  article =
    '台大公衛學院教授陳秀熙今天表示，近日全球新冠肺炎確診者已突破4000萬人，國際疫情可能持續一段時間才會下降，預估要等到明年2月，疫情才會受到較好控制。\n\n台灣大學公共衛生學院教授陳秀熙今天透過線上直播，說明全球COVID-19（2019冠狀病毒疾病，新冠肺炎）疫情狀況，全球確診人...'

  isShowDetail = false
  img = 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/10/21/98/8798273.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930&nt=1'

  backHandler (): void {
    this.isShowDetail = false
    this.$emit('backHandler')
  }
}
</script>

<style lang="scss" scoped>
.h-20::v-deep,
.h-20::v-deep > span {
  height: 20px !important;
}
.h-32::v-deep,
.h-32::v-deep > span {
  height: 32px !important;
}
.time-display {
  font-size: 10px;
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
