<template lang="pug">
.root.d-flex.justify-center.align-center(v-if='isLoading')
  v-progress-circular(indeterminate, color='primary')
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  name: 'Loading'
})
export default class Loading extends Vue {
  @Getter('feature/getIsLoading') public isLoading!: boolean
}
</script>

<style lang="scss" scoped>
.root {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
</style>
