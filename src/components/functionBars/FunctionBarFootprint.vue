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
  currentTab: number;
  isMapLoaded: boolean;
}

@Component({
  name: 'FunctionBarFootprint'
})

export default class FunctionBarFootprint extends Vue {
  @Getter('feature/getFootprint') public footprint!: Footprint
  @Mutation('feature/SET_footprintCurrentTab') public SET_footprintCurrentTab!: Function
  @Mutation('feature/TOGGLE_isLoading') public TOGGLE_isLoading!: Function

  changeTab (index: number): void {
    this.SET_footprintCurrentTab(index)
    if (this.footprint.currentTab === 0 && !this.footprint.isMapLoaded) {
      this.TOGGLE_isLoading()
    }
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
