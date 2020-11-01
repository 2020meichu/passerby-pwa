<template lang="pug">
div.take-photo-root.d-flex.justify-center.align-center
  BackBtn(@click.native="back")
  video.video(
    :class="facingMode === 'user' ? 'front' : ''"
    ref='video'
  )
  canvas(
    style='display: none'
    ref='canva'
  )
  v-btn.take-photo-btn(
    fab
    icon
    absolute
    outlined
    color="white"
    @click="takePhoto"
  )
    v-icon mdi-camera
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { component } from 'vue/types/umd'
import BackBtn from '@/components/BackBtn.vue'

interface info {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}

@Component({
  name: 'TakePhoto',
  components: {
    BackBtn
  }
})
export default class extends Vue {
  facingMode = 'environment'
  mediaStream: any = null
  // photo: any = null
  videoDevices: Array<info> = []
  switchingCamera = false

  async startRecording (facingMode: string) {
    this.facingMode = facingMode
    const video: any = this.$refs.video
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facingMode }
    })
    video.srcObject = this.mediaStream
    return await video.play()
  }

  async takePhoto () {
    const video: any = this.$refs.video
    const canva: any = this.$refs.canva
    const width: number = video.videoWidth
    const height: number = video.videoHeight
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

    this.$emit('setPhoto', canva.toDataURL('image/png'))
    this.back()
  }

  back () {
    this.$emit('toggleMode')
  }

  async mounted () {
    const devices: any = await navigator.mediaDevices.enumerateDevices()
    this.videoDevices = devices.filter((d: info) => d.kind === 'videoinput')
    await this.startRecording(
      this.videoDevices.length === 1 ? 'user' : 'environment'
    )
  }
}
</script>

<style lang="scss" scoped>
.take-photo-root {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: black;
}
.video {
  width: 100%;
  height: 340px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.take-photo-btn {
  bottom: 10vh;
}
</style>
