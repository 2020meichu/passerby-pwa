<template lang="pug">
.signup.primary.flex-column.justify-space-between
  BackBtn(@click.native='backButtonClickHandler')
  .bg-mask
  .bg
  .flex-grow-1
    .logo-section.d-flex.align-center
      .logo-section__logo.mr-2
      p.logo-section__font.darkmode-dark--text.mb-0 Passerby
  .indicator.d-flex.justify-center.align-center
    .indicator__bg.d-flex.justify-center.align-center.mr-2(:class='isStep2 ? "inactive" : "active"')
      .indicator__bg__dot.darkmode-dark
    .indicator__bg.d-flex.justify-center.align-center(:class='isStep2 ? "active" : "inactive"')
      .indicator__bg__dot.darkmode-dark
  v-scroll-x-reverse-transition(mode='out-in', hide-on-leave)
    UserForm(v-show='!isStep2', key='user-form', @switchStep2='switchStep2Handler')
  v-scroll-x-reverse-transition(mode='out-in', hide-on-leave)
    IdCardForm(v-show='isStep2', key='id-card-form', :userData='userData')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserForm from '@/components/signUp/UserForm.vue'
import IdCardForm from '@/components/signUp/IdCardForm.vue'
import BackBtn from '@/components/BackBtn.vue'

@Component({
  name: 'SignUp',
  components: {
    UserForm,
    IdCardForm,
    BackBtn
  }
})
export default class SignUp extends Vue {
  isStep2 = false
  userData: any

  switchStep2Handler (data: any): void {
    this.userData = data
    this.isStep2 = true
  }

  backButtonClickHandler (): void {
    if (this.isStep2) {
      this.isStep2 = false
    } else {
      this.$router.replace('/sign-in')
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
  background: #1de9b6;
  mix-blend-mode: screen;
  opacity: 0.6;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('~@/assets/img/bg.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.logo-section {
  top: 37px;
  left: 260px;
  z-index: 25;
  position: relative;
  &__logo {
    width: 14px;
    height: 20px;
    background-image: url('~@/assets/img/passerby-logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  &__font {
    font-size: 12px;
    font-weight: bold;
    font-family: 'Cabin', sans-serif;
  }
}
.signup {
  height: 100%;
  display: flex;
}
.indicator {
  z-index: 25;
  width: 100%;
  height: 34px;
  .active {
    background-color: rgba(#263238, 0.3);
  }
  .inactive {
    background-color: rgba(#263238, 0);
  }
  &__bg {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    &__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
}
</style>
