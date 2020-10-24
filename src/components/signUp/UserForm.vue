<template lang="pug">
.signup-card.darkmode-dark.px-12.pt-11
  div
    h1.fs-34.darkmode-white--text 註冊新帳號
    span.fs-12.darkmode-gray--text 步驟一 填寫使用者資料
  .pt-2
    v-form(
      ref='form'
      v-model='valid'
      lazy-validation
      @submit.prevent="register"
    )
      v-text-field(
        v-model='id'
        type='text'
        label='身分證字號'
        color='primary'
        :rules="idRule"
        required
      )
      v-text-field(
        v-model='name'
        type='text'
        label='使用者名稱'
        color='primary'
        :rules="nameRule"
        required
      )
      v-text-field(
        ref="password"
        v-model='password',
        :type='passwordVisiable ? "text" : "password"',
        :append-icon='passwordVisiable ? "mdi-eye" : "mdi-eye-off"',
        @click:append='passwordVisiable = !passwordVisiable',
        label='輸入密碼',
        color='primary',
        :rules="passwordRule"
        required
      )
      v-text-field(
        v-model='confirmPassword',
        :type='passwordVisiable ? "text" : "password"',
        :append-icon='passwordVisiable ? "mdi-eye" : "mdi-eye-off"',
        @click:append='passwordVisiable = !passwordVisiable',
        label='請再次輸入密碼',
        color='primary',
        :rules="confirmPasswordRule"
        required
      )
      v-checkbox.mt-0.mb-4.checkbox(
        v-model='isAgree'
        :label='`是否同意使用者隱私條款`'
        :rules="checkboxRule"
        hide-details
        dense
        required
      )
      v-btn(color='primary', block, type="submit") 註冊
      p.d-flex.justify-center.mt-4.mb-2.fs-12.darkmode-gray--text 已擁有帳號？
      v-btn(color='primary', block, outlined, to='/sign-in') 使用者登入
</template>

<script lang="ts"> 
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'UserForm'
})
export default class UserForm extends Vue {
  valid: boolean = true
  id: string = ''
  name: string = ''
  password: string = ''
  confirmPassword: string = ''
  passwordVisiable: boolean = false
  isAgree: boolean = false
  idRule:any = [
    (v:boolean|string) => !!v || '此格為必填',
    (v:boolean|string) => (v && (v as string).length == 10) || '身分證字號必為10碼'
  ]
  nameRule:any = [
    (v:boolean|string) => !!v || '此格為必填',
  ]
  passwordRule:any = [
    (v:boolean|string) => !!v || '此格為必填',
  ]
  confirmPasswordRule:any = [
    (v:string) => !!v || '此格為必填',
    (v:string) => (v && v === this.$refs.password.value) || '與密碼不相符'
  ]
  checkboxRule:any = [
    (v:boolean) => !!v || false,
  ]
  $refs!: {
    form: HTMLFormElement
    password: HTMLFormElement
  }

  register () {

  }
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