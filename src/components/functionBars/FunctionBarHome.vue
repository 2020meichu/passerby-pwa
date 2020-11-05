<template lang="pug">
  div
    h1.fs-34.darkmode-white--text {{ $t('main.label.greeting', { username }) }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

interface Footprint {
  currentTab: number;
}

@Component({
  name: 'FunctionBarFootprint'
})

export default class FunctionBarFootprint extends Vue {
  @Getter('user/getUsername') public username!: string

  mounted () {
    console.log(this.username)
  }
}
</script>
