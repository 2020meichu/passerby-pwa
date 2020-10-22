<template lang="pug">
.sigin.primary.flex-column.justify-space-between
  div
    h1.fs-34.darkmode-white--text LOGO
  .signin-card.darkmode-dark.px-12.pt-11
    div
      h1.heading-size.darkmode-white--text 使用者登入
    .pt-4
      v-form(ref='form', v-model='valid', lazy-validation)
        v-text-field(v-model='id', type='text', label='身分證字號', color='primary', required)
        v-text-field(
          v-model='password',
          :type='passwordVisiable ? "text" : "password"',
          :append-icon='passwordVisiable ? "mdi-eye" : "mdi-eye-off"',
          @click:append='passwordVisiable = !passwordVisiable',
          label='使用者密碼',
          color='primary',
          required
        )
        p.d-flex.justify-end.mb-6.fs-12.primary--text 忘記使用者密碼？
        v-btn(color='primary' block) 登入
        p.d-flex.justify-center.mt-5.mb-3.fs-12 尚未擁有帳號？
        v-btn(color='primary' block outlined to="/sign-up") 註冊新帳號
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SignIn extends Vue {
  valid: boolean = true
  id: string = ''
  password: string = ''
  passwordVisiable: boolean = false
}
</script>

<style lang="scss" scoped>
.sigin {
  height: 100%;
  display: flex;
}
.signin-card {
  height: 485px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>