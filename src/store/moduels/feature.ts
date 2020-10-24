interface Footprint {
  currentTab: Number
}

interface CheckIn {

}

interface FeatureState {
  footprint: Footprint,
  checkIn: CheckIn
}

const state: FeatureState = {
  footprint: {
    currentTab: 0
  },
  checkIn: {}
}

const getters: any = {
  getFootprint (state: FeatureState): Footprint {
    return state.footprint
  }
}

const mutations: any = {
  setFootprintCurrentTab (state: FeatureState, value: Number): void {
    state.footprint.currentTab = value
  }
}

const actions: any = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}