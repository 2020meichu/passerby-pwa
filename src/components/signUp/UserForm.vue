<template lang="pug">
.signup-card.darkmode-dark.px-12.pt-11
  div
    h1.fs-34.darkmode-white--text 註冊新帳號
    span.fs-12.darkmode-gray--text 步驟一 填寫使用者資料
  .pt-2
    v-form(ref='form', v-model='valid', lazy-validation)
      v-text-field(v-model='id', type='text', label='身分證字號', color='primary', required)
      v-text-field(v-model='name', type='text', label='使用者名稱', color='primary', required)
      v-text-field(
        v-model='password',
        :type='passwordVisiable ? "text" : "password"',
        :append-icon='passwordVisiable ? "mdi-eye" : "mdi-eye-off"',
        @click:append='passwordVisiable = !passwordVisiable',
        label='輸入密碼',
        color='primary',
        required
      )
      v-text-field(
        v-model='confirmPassword',
        :type='passwordVisiable ? "text" : "password"',
        :append-icon='passwordVisiable ? "mdi-eye" : "mdi-eye-off"',
        @click:append='passwordVisiable = !passwordVisiable',
        label='請再次輸入密碼',
        color='primary',
        required
      )
      v-checkbox.mt-0.mb-4.checkbox(v-model='isAgree', :label='`是否同意使用者隱私條款`', hide-details, dense, required)
      v-btn(color='primary', block) 註冊
      p.d-flex.justify-center.mt-4.mb-2.fs-12.darkmode-gray--text 已擁有帳號？
      v-btn(color='primary', block, outlined, to='/sign-in') 使用者登入
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'UserForm'
})
export default class extends Vue {
  valid: boolean = true
  id: string = ''
  name: string = ''
  password: string = ''
  passwordVisiable: boolean = false
  isAgree: boolean = false
}
</script>

<style lang="scss" scoped>
.signup-card {
  height: 564px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.checkbox::v-deep > .v-input__control > .v-input__slot > label {
  font-size: 12px;
}
</style>