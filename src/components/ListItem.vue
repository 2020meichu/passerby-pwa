<template lang="pug">
v-list-item(inactive @click="handleClick")
  v-list-item-icon
    v-icon.darkmode-gray--text {{ icon }}
  v-list-item-content
    v-list-item-title {{ title }}
    v-list-item-subtitle(v-if="subTitle") {{ subTitle }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'ListItem'
})
export default class ListItem extends Vue {
  @Prop(String) readonly icon!: string
  @Prop(String) readonly title!: string
  @Prop(String) readonly subTitle!: string
  @Prop(String) readonly emitFunction!: string

  handleClick () {
    if (this.emitFunction) {
      this.$emit(this.emitFunction)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item {
  padding: 0;
}
</style>
