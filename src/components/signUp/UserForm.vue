<template lang="pug">
.signup-card.darkmode-dark.px-12.pt-11
  div
    h1.fs-34.darkmode-white--text  {{ $t('signup.label.register') }}
    span.fs-12.darkmode-gray--text {{ $t('signup.label.step1') }}
  .pt-2
    v-form(
      ref='form'
      v-model='valid'
      lazy-validation
      @submit.prevent="submitHandler"
    )
      v-text-field(
        v-model='id'
        type='text'
        :label="$t('signup.field.socialIdentityNumber')"
        color='primary'
        :rules="idRule"
        required
      )
      v-text-field(
        v-model='username'
        type='text'
        :label="$t('signup.field.username')"
        color='primary'
        :rules="usernameRule"
        required
      )
      v-text-field(
        ref="password"
        v-model='password',
        :type='passwordVisiable ? "text" : "password"',
        :append-icon='passwordVisiable ? "mdi-eye" : "mdi-eye-off"',
        @click:append='passwordVisiable = !passwordVisiable',
        :label="$t('signup.field.password')"
        color='primary',
        :rules="passwordRule"
        required
      )
      v-text-field(
        v-model='confirmPassword',
        :type='passwordVisiable ? "text" : "password"',
        :append-icon='passwordVisiable ? "mdi-eye" : "mdi-eye-off"',
        @click:append='passwordVisiable = !passwordVisiable',
        :label="$t('signup.field.confirmPassword')"
        color='primary',
        :rules="confirmPasswordRule"
        required
      )
      v-checkbox.mt-0.mb-4.checkbox(
        v-model='isAgree'
        :label="$t('signup.label.agreement')"
        :rules="checkboxRule"
        hide-details
        dense
        required
      )
      v-btn(color='primary', block, type="submit") {{ $t('signup.button.nextStep') }}
      p.d-flex.justify-center.mt-4.mb-2.fs-12.darkmode-gray--text {{ $t('signup.label.hadAccount') }}
      v-btn(color='primary', block, outlined, to='/sign-in')  {{ $t('signup.button.login') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'UserForm'
})
export default class UserForm extends Vue {
  valid = true
  id = ''
  username = ''
  password = ''
  confirmPassword = ''
  passwordVisiable = false
  isAgree = false
  idRule: any = [
    (v: boolean|string) => !!v || this.$t('signup.label.requiredField'),
    (v: boolean|string) => (v && (v as string).length == 10) || this.$t('signup.label.SINCheck')
  ]

  usernameRule: any = [
    (v: boolean|string) => !!v || this.$t('signup.label.requiredField')
  ]

  passwordRule: any = [
    (v: boolean|string) => !!v || this.$t('signup.label.requiredField')
  ]

  confirmPasswordRule: any = [
    (v: string) => !!v || this.$t('signup.label.requiredField'),
    (v: string) => (v && v === this.$refs.password.value) || this.$t('signup.label.passwordCheck')
  ]

  checkboxRule: any = [
    (v: boolean) => !!v || false
  ]

  $refs!: {
    form: HTMLFormElement;
    password: HTMLFormElement;
  }

  submitHandler () {
    const check: boolean = this.$refs.form.validate()
    if (!check) {
      return
    }
    this.$emit('switchStep2', {
      id: this.id,
      username: this.username,
      password: this.password
    })
  }
}
</script>

<style lang="scss" scoped>
.signup-card {
  z-index: 25;
  height: 564px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.checkbox::v-deep > .v-input__control > .v-input__slot > label {
  font-size: 12px;
}
</style>
