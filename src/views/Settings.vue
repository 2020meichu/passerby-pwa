<template lang="pug">
.settings-root.d-flex.justify-center
  v-list.list.darkmode-dark
    v-subheader.subheader 使用者相關
    list-item.pl-4.pr-4(
      v-for='(item, i) in userSettingItems',
      :key='`user-${i}`',
      :icon='item.icon',
      :title='item.title',
      :subTitle='item.subTitle',
      :emitFunction='item.emitFunction',
      @emitLogoutDialog='emitLogoutDialog'
    )
    v-divider
    v-subheader.subheader 應用程式相關
    list-item.pl-4.pr-4(
      v-for='(item, i) in appSettingItems',
      :key='`app-${i}`',
      :icon='item.icon',
      :title='item.title',
      :subTitle='item.subTitle',
      :emitFunction='item.emitFunction',
      @toggleSheet='toggleSheet'
    )
    v-bottom-sheet.darkmode-superdark(v-model='isLanguageListOpen')
      v-sheet.rounded-t-20.darkmode-superdark(height='169px')
        v-list.rounded-t-20.darkmode-superdark
          v-subheader 語言
          v-list-item.pl-4.pr-4(v-for='item in languageList', :key='item.name', @click='switchLocaleLanguage(item.i18n)')
            v-list-item-content
              v-list-item-title(:class='{ "primary--text": item.i18n === selectedLanguage.i18n }') {{ item.name }}
    v-dialog(v-model='isLogoutModalOpen', width='279', overlay-opacity='0.7')
      v-card.rounded-20.darkmode-dark(width='279')
        v-card-title 是否登出
        v-card-actions
          v-spacer
          v-btn(color='primary', text, @click='isLogoutModalOpen = false') 取消
          v-btn.ml-0(color='primary', text, @click='logout') 確定
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TranslateResult } from 'vue-i18n'
import ListItem from '@/components/ListItem.vue'
import { Mutation, Getter } from 'vuex-class'

interface SettingItem {
  type: string
  icon: string
  title: string | TranslateResult
  subTitle: string | null
  emitFunction: string | null
}

interface Language {
  name: string
  i18n: string
}

@Component({
  components: {
    ListItem
  }
})
export default class Settings extends Vue {
  @Getter('user/getUsername') public username!: string
  isLogoutModalOpen = false
  isLanguageListOpen = false
  languageList: Array<Language> = [
    {
      name: '繁體中文 (台灣)',
      i18n: 'tw'
    },
    {
      name: 'English (US)',
      i18n: 'en'
    }
  ]
  currentI18n = localStorage.getItem('i18n') || 'en'

  get selectedLanguage(): Language {
    const index = this.languageList.findIndex((language) => language.i18n === this.currentI18n)
    return this.languageList[index]
  }

  get userSettingItems(): Array<SettingItem> {
    return [
      {
        type: 'user',
        icon: 'mdi-border-color',
        title: this.$t('changeUsername'),
        subTitle: this.username,
        emitFunction: null
      },
      {
        type: 'user',
        icon: 'mdi-lock',
        title: this.$t('changePassword'),
        subTitle: null,
        emitFunction: null
      },
      {
        type: 'user',
        icon: 'mdi-login',
        title: this.$t('logout'),
        subTitle: null,
        emitFunction: 'emitLogoutDialog'
      }
    ]
  }

  get appSettingItems(): Array<SettingItem> {
    console.log(this.$t('language'))
    return [
      {
        type: 'app',
        icon: 'mdi-web',
        title: this.$t('language'),
        subTitle: this.selectedLanguage.name,
        emitFunction: 'toggleSheet'
      },
      {
        type: 'app',
        icon: 'mdi-cellphone-cog',
        title: this.$t('version'),
        subTitle: '0.0.1',
        emitFunction: null
      }
    ]
  }

  toggleSheet() {
    this.isLanguageListOpen = !this.isLanguageListOpen
  }

  switchLocaleLanguage(i18n: string): void {
    this.currentI18n = i18n
    this.$i18n.locale = i18n
    localStorage.setItem('i18n', i18n)
    this.toggleSheet()
  }

  emitLogoutDialog() {
    this.isLogoutModalOpen = true
  }

  logout() {
    this.isLogoutModalOpen = false
    localStorage.removeItem('token')
    this.$router.replace('/sign-in')
  }
}
</script>

<style lang="scss" scoped>
.settings-root {
  width: 100%;
  .list {
    width: 279px;
    .subheader {
      padding: 0;
      font-size: 14px;
    }
  }
}
</style>>
