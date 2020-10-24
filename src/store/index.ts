import Vue from 'vue'
import Vuex from 'vuex'

import feature from './moduels/feature'
import user from './moduels/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    feature,
    user
  }
})
