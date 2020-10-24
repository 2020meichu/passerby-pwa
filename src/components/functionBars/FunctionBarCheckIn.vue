fixed<template lang="pug">
.root.d-flex.align-end.justify-space-between
  h1.fs-34.darkmode-white--text 打卡您的位置
//- .fs-12
    v-icon(x-small, color='primary') mdi-map-marker
    span.primary--text 東港神秘小地方
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'FunctionBarCheckIn'
})
export default class FunctionBarCheckIn extends Vue {}
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
}
</style>