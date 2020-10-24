<template lang="pug">
  div.function-bar-footprint
    h1.d-flex.fs-34.darkmode-white--text 足跡檢視
    div
      v-btn.mr-2(rounded, small, :class="{ 'primary': footprint.currentTab === 0, 'black--text': footprint.currentTab === 0 }", @click="changeTab(0)") 地圖
      v-btn(rounded, small, :class="{ 'primary': footprint.currentTab === 1, 'black--text': footprint.currentTab === 1  }", @click="changeTab(1)") 時間軸
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, Getter } from 'vuex-class'

interface Footprint {
  currentTab: Number
}

@Component({
  name: 'FunctionBarFootprint',
})

export default class FunctionBarFootprint extends Vue {
  @Getter('feature/getFootprint') public footprint!: Footprint
  @Mutation('feature/setFootprintCurrentTab') public setFootprintCurrentTab!: Function

  changeTab(index: Number): void {
    this.setFootprintCurrentTab(index)
  }
}
</script>

<style lang="scss" scoped>
  .function-bar-footprint {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    & > div {
      display: flex;
      align-content: center;
    }
  }
</style>