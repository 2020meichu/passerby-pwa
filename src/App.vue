<template lang="pug">
v-app
  v-main.darkmode-dark
    router-view
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss">
@import '@/styles/main.scss';
</style>
