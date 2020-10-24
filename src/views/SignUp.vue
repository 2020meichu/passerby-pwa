<template lang="pug">
.signup.primary.flex-column.justify-space-between
  BackBtn
  .flex-grow-1
    //- h1.fs-34.darkmode-white--text LOGO
  .indicator.d-flex.justify-center.align-center
    .indicator__bg.d-flex.justify-center.align-center.mr-2(:class="isStep2 ? 'inactive' : 'active'")
      .indicator__bg__dot.darkmode-dark
    .indicator__bg.d-flex.justify-center.align-center(:class="isStep2 ? 'active' : 'inactive'")
      .indicator__bg__dot.darkmode-dark
  UserForm(v-if='!isStep2')
  IdCardForm(v-else)
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserForm from '@/components/signUp/UserForm.vue'
import IdCardForm from '@/components/signUp/IdCardForm.vue'
import BackBtn from '@/components/BackBtn.vue'

@Component({
  components: {
    UserForm,
    IdCardForm,
    BackBtn
  }
})
export default class SignIn extends Vue {
  isStep2: boolean = false
}
</script>

<style lang="scss" scoped>
.signup {
  height: 100%;
  display: flex;
}
.indicator {
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