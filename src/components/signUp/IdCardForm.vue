<template lang="pug">
.signup-card.darkmode-dark.px-12.pt-11
  div
    h1.fs-34.darkmode-white--text 註冊新帳號
    span.fs-12.darkmode-gray--text 步驟二 上傳身份證
  .pt-6.d-flex.justify-center.align-center
    .take-photo-section.d-flex.justify-center.align-center.flex-column
      v-icon.take-photo-section__icon(color='primary', x-large) mdi-camera
      p.primary--text 點此拍攝身份證
    v-file-input.id-card-input(filled, full-width, height='340')
    //- video.video.mb-7(
    //-   :class="facingMode === 'user' ? 'front' : ''"
    //-   ref='video'
    //- )
    //- canvas(
    //-   style='display: none'
    //-   ref='canva'
    //- )
  v-btn(color='primary', block, disabled) 上傳
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface info {
  deviceId: string
  groupId: string
  kind: string
  label: string
}

@Component({
  name: 'IdCardForm'
})
export default class extends Vue {
  facingMode: string = 'environment'
  mediaStream: any = null
  photo: any = null
  videoDevices: Array<info> = []
  switchingCamera: boolean = false

  async startRecording (facingMode: string) {
    this.facingMode = facingMode
    const video:any = this.$refs.video
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facingMode}
    })
    video.srcObject = this.mediaStream
    return await video.play()
  }
  async takePhoto () {
    const video:any = this.$refs.video
    const canva:any = this.$refs.canva
    const width:number = video.videoWidth
    const height:number = video.videoHeight
    canva.width = width
    canva.height = height
    const ctx = canva.getContext('2d')
    ctx.save()

    if (this.facingMode === 'user') {
      ctx.scale(-1, 1)
      ctx.drawImage(video, width * -1, 0, width, height)
    } else {
      ctx.drawImage(video, 0, 0)
    }

    ctx.restore()

    this.photo = canva.toDataURL('image/png')
  }
  // async switchCamera () {
  //   this.
  // }
  async mounted () {
    const devices:any = await navigator.mediaDevices.enumerateDevices()
    this.videoDevices = devices.filter((d:info) => d.kind === 'videoinput')
    await this.startRecording(
      this.videoDevices.length === 1 ? 'user' : 'environment'
    )
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
  position: absolute;
  > p {
    font-size: 12px;
  }
}
.id-card-input::v-deep > .v-input__prepend-outer {
  display: none;
}
.video {
  width: 100%;
  height: 340px;
  background-color: red;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>