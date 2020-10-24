<template lang="pug">
.signup-card.darkmode-dark.px-12.pt-11
  div
    h1.fs-34.darkmode-white--text 註冊新帳號
    span.fs-12.darkmode-gray--text 步驟二 上傳身份證
  .pt-6.d-flex.justify-center.align-center
    .take-photo-section.d-flex.justify-center.align-center.flex-column.mb-2.darkmode-superdark(@click="toggleTakePhoto")
      div.d-flex.flex-column.justify-center.align-center(v-if="!photo")
        v-icon.take-photo-section__icon(color='primary', x-large) mdi-camera
        p.primary--text.mb-0 點此拍攝身份證
      img(v-else :src="photo")
  div.hint.mb-7(v-if="!photo")
  div.hint.d-flex.justify-center.align-center.mb-4(@click="toggleTakePhoto" v-else)
    v-icon.primary--text.mr-1(small) mdi-camera
    p.primary--text.mb-0 重新拍攝
  v-btn(color='primary', block, :disabled="!photo", :loading="isUploading" @click="uploadHandler") 上傳
  TakePhoto(
    v-if="isTakePhoto"
    @setPhoto="setPhoto"
    @toggleMode="toggleTakePhoto"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { component } from 'vue/types/umd'
import { Mutation, Getter } from 'vuex-class'
import TakePhoto from '@/components/signUp/TakePhoto.vue'
import FaceRecognition from '@/plugins/face-recognition'
import axios from '@/plugins/axios'

@Component({
  name: 'IdCardForm',
  components: {
    TakePhoto
  }
})
export default class extends Vue {
  @Prop(Object) readonly userData!: any
  
  @Mutation('user/setAvatar') public setAvatar!: Function
  @Mutation('user/setUser') public setUser!: Function
  isTakePhoto: boolean = false
  isUploading: boolean = false
  photo: any = null

  async setPhoto (photo:any): Promise<void> {
    this.photo = photo

  }
  toggleTakePhoto () {
    this.isTakePhoto = !this.isTakePhoto
  }
  async uploadHandler () {
    this.isUploading = true
    try {
      const clipped:string = await FaceRecognition.getFaceImageDataURL(this.photo, 200)
      // The function to transfer from dataURL to Blob
      const dataURLtoBlob = (dataurl: string): Blob => {
        const arr = dataurl.split(','), mime = (arr[0].match(/:(.*?);/) as Array<string>)[1],
          binaryStr = atob(arr[1])
        let n = binaryStr.length, uint8arr = new Uint8Array(n)
        while(n--){
          uint8arr[n] = binaryStr.charCodeAt(n)
        }
        return new Blob([uint8arr], { type:mime })
      }

      const formData:FormData = new FormData()
      Object.keys(this.userData).forEach((key: string): void => {
        formData.append(key, this.userData[key])
      })
      formData.append('id_photo', dataURLtoBlob(this.photo))
      formData.append('avatar', dataURLtoBlob(clipped))
      console.log(this.userData, formData)

      const { data } = await axios.post('/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // Save the token to local storage
      localStorage['token'] = data.user.token
      data.user.avatar = `${data.user.avatar}`
      this.setUser(data.user)
      this.$router.replace('/home')
    } catch (error) {
      console.log(error)
    }
    this.isUploading = false
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
  > div > p {
    font-size: 12px;
  }
  > img {
    width:100%;
  }
}
.hint {
  width: 100%;
  p {
    font-size: 12px;
  }
}
.id-card-input::v-deep > .v-input__prepend-outer {
  display: none;
}

</style>