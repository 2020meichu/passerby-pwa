<template lang="pug">
v-app
  v-main.darkmode-dark
    router-view
  v-dialog(v-model='isDisplayDialog', persistent, max-width='300')
    v-card
      v-card-title.headline 開啟 Google 位置服務
      v-card-text 我們偵測到 GPS 定位服務尚未開啟，請使用 Google 幫助應用確定位置。（這意味著即使沒有應用在運行，也會向 Google 發送匿名位置資料。）
      v-card-actions
        v-spacer
        v-btn(color='green darken-1', text, @click='closeApp') 了解
  loading
  v-snackbar(v-model="notification.isDisplay" :timeout="3000" :color="notification.color") {{ notification.message }}
    template(v-slot:action="{ attrs }")
        v-btn(
          color="white"
          text
          v-bind="attrs"
          @click="closeNotification") Close
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Loading from '@/components/Loading.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Loading
  },
  data() {
    return {
      isDisplayDialog: false
    }
  },
  computed: {
    ...mapGetters({
      notification: 'feature/getNotification'
    })
  },
  mounted() {
    ;(window as any).navigator.permissions.query({ name: 'geolocation' }).then((result: any) => {
      console.log(result)
      this.isDisplayDialog = result.state === 'denied'
    })
  },
  methods: {
    ...mapActions({
      closeNotification: 'feature/closeNotification'
    }),
    closeApp() {
      ;(window as any).close()
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/main.scss';

a[href^="http://maps.google.com/maps"]
{
  display: none !important;
}
a[href^="https://maps.google.com/maps"]
{
  display: none !important;
}

.gmnoprint a,
.gmnoprint span,
.gm-style-cc {
  display: none;
}
.gmnoprint div {
  background: none !important;
}
</style>
