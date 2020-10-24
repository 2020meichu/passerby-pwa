module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    module: {
      rules: [
        { test: /\.node$/, use: 'node-loader' },
      ]
    }
  }
}
