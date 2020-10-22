import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.teal.accent3,
        'darkmode-dark': colors.blueGrey.darken4,
        'darkmode-white': colors.grey.lighten5,
        'darkmode-danger': colors.red.accent2,
        'darkmode-yellow': colors.yellow.accent4
      }
    }
  }
})
