<template lang="pug">
v-row.place-item.rounded-20.darkmode-superdark.px-3
  v-col.d-flex.align-center.justify-center(cols='2')
    v-btn(x-small, color='primary', fab)
      template(v-if='isLastOne')
        v-icon(color='darkmode-superdark') mdi-pencil
      template(v-else)
        v-icon(color='darkmode-superdark') mdi-map-marker
  v-col.d-flex.flex-column.justify-center(cols='10')
    h6.fs-12.lh-12.mb-1 {{ name }}
    span.fs-10.lh-10.text-dot-1.darkmode-gray--text {{ distance }}m | {{ address }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'PlaceItem'
})
export default class PlaceItem extends Vue {
  @Prop(Boolean) readonly isLastOne!: string
  @Prop(String) readonly name?: string
  @Prop(String) readonly address?: string
  @Prop(Number) readonly distance?: number
}
</script>

<style lang="scss" scoped>
.place-item {
  height: 64px;
}
</style>