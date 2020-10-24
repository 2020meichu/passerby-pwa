<template lang="pug">
.primary.avatar.d-flex.justify-center.align-center
  img(ref="avatar")
</template>

<script lang="ts">
import axios from '@/plugins/axios'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'Avatar'
})

export default class Avatar extends Vue {
  @Prop(String) readonly imgPath!: string
  $refs!: {
    avatar: HTMLImageElement
  }

  async mounted (): Promise<void> {
    // Obtain image through axios GET request
    const { data } = await axios.get(this.imgPath, {
      responseType: 'blob'
    })
    const reader = new (window as any).FileReader()
    reader.readAsDataURL(data)
    reader.onload = (): void => {
      const imageDataUrl = reader.result
      this.$refs.avatar.setAttribute('src', imageDataUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 13px;
  > img {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
