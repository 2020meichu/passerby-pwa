<template lang="pug">
.settings-root.d-flex.justify-center
  v-list.list.darkmode-dark
    v-subheader.subheader 使用者相關
    list-item(
      v-for="(item, i) in userSettingItems"
      :key="`user-${i}`"
      :icon="item.icon"
      :title="item.title"
      :subTitle="item.subTitle"
      :emitFunction="item.emitFunction"
    )
    v-divider
    v-subheader.subheader 應用程式相關
    list-item(
      v-for="(item, i) in appSettingItems"
      :key="`app-${i}`"
      :icon="item.icon"
      :title="item.title"
      :subTitle="item.subTitle"
      :emitFunction="item.emitFunction"
      @toggleSheet="toggleSheet"
    )
    v-bottom-sheet.darkmode-superdark(v-model="sheet")
      v-sheet.darkmode-superdark(height="169px")
        v-list.darkmode-superdark
          v-subheader 語言
          v-list-item(@click="toggleSheet")
            v-list-item-content
              v-list-item-title.primary--text 繁體中文
          v-list-item(@click="toggleSheet")
            v-list-item-content
                v-list-item-title 英文
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ListItem from '@/components/ListItem.vue'

interface settingItem {
  type: string
  icon: string
  title: string
  subTitle: string | null
  emitFunction: string | null
}

@Component({
  components: {
    ListItem
  }
})
export default class Settings extends Vue {
  sheet: boolean = false
  settingItems: Array<settingItem> = [
    {
      type: 'user',
      icon: 'mdi-border-color',
      title: '更改使用者名稱',
      subTitle: '目前名稱: 俊豪',
      emitFunction: null
    },
    {
      type: 'user',
      icon: 'mdi-lock',
      title: '更改使用者密碼',
      subTitle: null,
      emitFunction: null
    },
    {
      type: 'user',
      icon: 'mdi-login',
      title: '帳號登出',
      subTitle: null,
      emitFunction: null
    },
    {
      type: 'app',
      icon: 'mdi-web',
      title: '語言',
      subTitle: '繁體中文',
      emitFunction: 'toggleSheet'
    },
    {
      type: 'app',
      icon: 'mdi-cellphone-cog',
      title: '應用程式版本',
      subTitle: '0.0.1',
      emitFunction: null
    }
  ]

  get userSettingItems(): Array<settingItem> {
    return this.settingItems.filter(item => {
      return item.type === 'user'
    })
  }
  get appSettingItems(): Array<settingItem> {
    return this.settingItems.filter(item => {
      return item.type === 'app'
    })
  }
  toggleSheet () {
    this.sheet = !this.sheet
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
.v-sheet {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>>