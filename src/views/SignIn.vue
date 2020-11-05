<template lang="pug">
.sigin.flex-column.justify-space-between
  div.bg-mask
  div.bg
  div.logo-section.flex-grow-1.d-flex.justify-center.align-center.flex-column
    div.logo-section__logo.mb-2.mt-4
    p.mb-0.darkmode-dark--text Passerby
  .signin-card.darkmode-dark.px-12.pt-11
    div
      h1.fs-34.darkmode-white--text {{ $t('signin.label.login') }}
    .pt-4
      v-form(ref='form', v-model="valid", lazy-validation, @submit.prevent="submitHandler")
        v-text-field(v-model='id', type='text', :label="$t('signin.field.socialIdentityNumber')", color='primary', :rules="idRule", required)
        v-text-field(
          v-model='password',
          :type='passwordVisiable ? "text" : "password"',
          :append-icon='passwordVisiable ? "mdi-eye" : "mdi-eye-off"',
          @click:append='passwordVisiable = !passwordVisiable',
          :label="$t('signin.field.password')",
          color='primary',
          :rules="passwordRule",
          required
        )
        p.d-flex.justify-end.mb-6.fs-12.primary--text {{ $t('signin.label.forgetPassword') }}
        v-btn(color='primary', block, type="submit") {{ $t('signin.button.login') }}
        p.d-flex.justify-center.mt-5.mb-3.fs-12 {{ $t('signin.label.noAccount') }}
        v-btn(color='primary', block, outlined, to='/sign-up') {{ $t('signin.button.register') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component({
  name: 'SignIn'
})
export default class SignIn extends Vue {
  @Action('user/login') public login!: Function
  @Action('feature/openNotification') public openNotification!: Function
  valid = true
  id = ''
  password = ''
  passwordVisiable = false
  idRule: any = [
    (v: boolean|string) => !!v || this.$t('signin.label.requiredField'),
    (v: boolean|string) => (v && (v as string).length == 10) || this.$t('signin.label.SINCheck')
  ]

  passwordRule: any = [
    (v: boolean|string) => !!v || this.$t('signin.label.requiredField'),
  ]

  $refs!: {
    form: HTMLFormElement;
  }

  async submitHandler (): Promise<void> {
    const check: boolean = this.$refs.form.validate()
    if (!check) {
      return
    }
    try {
      await this.login({
        id: this.id,
        password: this.password
      })
      this.$router.replace('/')
    } catch (error) {
      if ('response' in error) {
        this.openNotification({
          message: `系統資訊：${error.response.data.message}`,
          color: 'red'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: #1DE9B6;
  mix-blend-mode: screen;
  opacity: 0.6;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color:white;
  background-image: url('~@/assets/img/bg.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.logo-section {
  z-index: 25;
  &__logo {
    width: 54px;
    height: 80px;
    background-image: url('~@/assets/img/passerby-logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  > p {
    font-size: 16px;
    font-weight: bold;
    font-family: 'Cabin', sans-serif;
  }
}
.sigin {
  height: 100%;
  display: flex;
}
.signin-card {
  z-index: 50;
  height: 485px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
