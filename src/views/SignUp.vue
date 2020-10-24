<template lang="pug">
.signup.primary.flex-column.justify-space-between
  BackBtn
  .flex-grow-1
    //- h1.fs-34.darkmode-white--text LOGO
  .indicator.d-flex.justify-center.align-center
    .indicator__bg.d-flex.justify-center.align-center.mr-2
      .indicator__bg__dot.darkmode-dark
    .indicator__bg.d-flex.justify-center.align-center
      .indicator__bg__dot.darkmode-dark
  UserForm
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserForm from '@/components/signUp/UserForm.vue'
import BackBtn from '@/components/BackBtn.vue'

@Component({
  name: 'SignUp',
  components: {
    UserForm,
    BackBtn
  }
})
export default class SignUp extends Vue {}
</script>

<style lang="scss" scoped>
.signup {
  height: 100%;
  display: flex;
}
.indicator {
  width: 100%;
  height: 34px;
  &__bg {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgba(#263238, 0.3);
    &__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
}
</style>