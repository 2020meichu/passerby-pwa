<template lang="pug">
v-btn.back-btn(width='42', height='42', elevation="4", icon)
  v-icon mdi-arrow-left
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'BackBtn'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.back-btn {
  position: absolute;
  top: 26px;
  left: 30px;
  z-index: 100;
  border-radius: 10px;
  background-color: #263238;
}
</style>