fixed<template lang="pug">
.root.d-flex.align-end.justify-space-between
  template(v-if="!hasCheckIned")
    h1.fs-34.darkmode-white--text 打卡您的位置
  template(v-if="hasCheckIned")
    h1.fs-34.darkmode-white--text 打卡成功
//- .fs-12
  v-icon(x-small, color='primary') mdi-map-marker
  span.primary--text 東港神秘小地方
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Mutation, Action } from 'vuex-class'

@Component({
  name: 'FunctionBarCheckIn'
})
export default class FunctionBarCheckIn extends Vue {
  @Getter('feature/getHasCheckIned') public hasCheckIned!: any
}
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
}
</style>
