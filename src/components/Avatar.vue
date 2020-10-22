<template lang="pug">
.primary.avatar.d-flex.justify-center.align-center
  img(:src='imgPath')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'Avatar'
})

export default class Avatar extends Vue {
  @Prop(String) readonly imgPath!: string
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
