module.exports = {
  lintOnSave: false,

  transpileDependencies: [
    'vuetify'
  ],

  configureWebpack: {
    module: {
      rules: [
        { test: /\.node$/, use: 'node-loader' }
      ]
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
