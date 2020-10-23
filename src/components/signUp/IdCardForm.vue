<template lang="pug">
.signup-card.darkmode-dark.px-12.pt-11
  div
    h1.fs-34.darkmode-white--text 註冊新帳號
    span.fs-12.darkmode-gray--text 步驟二 上傳身份證
  .pt-6.d-flex.justify-center.align-center
    .take-photo-section.d-flex.justify-center.align-center.flex-column.mb-7.darkmode-superdark(@click="toggleTakePhoto")
      div(v-if="!photo")
        v-icon.take-photo-section__icon(color='primary', x-large) mdi-camera
        p.primary--text 點此拍攝身份證
      img(v-else :src="photo")
  v-btn(color='primary', block, :disabled="isTakePhoto") 上傳
  TakePhoto(
    v-if="isTakePhoto"
    @setPhoto="setPhoto"
    @toggleMode="toggleTakePhoto"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { component } from 'vue/types/umd'
import TakePhoto from '@/components/signUp/TakePhoto.vue'

@Component({
  name: 'IdCardForm',
  components: {
    TakePhoto
  }
})
export default class extends Vue {
  isTakePhoto: boolean = false
  photo: any = null

  setPhoto (photo:any) {
    this.photo = photo
    console.log(photo)
  }
  toggleTakePhoto () {
    this.isTakePhoto = !this.isTakePhoto
  }
}
</script>

<style lang="scss" scoped>
.signup-card {
  height: 564px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.take-photo-section {
  width: 230px;
  height: 340px;
  border-radius: 12px;
  > p {
    font-size: 12px;
  }
  > img {
    width:100%;
  }
}
.id-card-input::v-deep > .v-input__prepend-outer {
  display: none;
}

</style>