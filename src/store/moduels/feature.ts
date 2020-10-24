interface Footprint {
  currentTab: Number
}

interface CheckIn {}

interface FeatureState {
  footprint: Footprint
  checkIn: CheckIn
  isLoading: boolean
}

const state: FeatureState = {
  footprint: {
    currentTab: 0
  },
  checkIn: {},
  isLoading: false
}

const getters: any = {
  getFootprint(state: FeatureState): Footprint {
    return state.footprint
  },
  getIsLoading(state: FeatureState): boolean {
    return state.isLoading
  }
}

const mutations: any = {
  setFootprintCurrentTab(state: FeatureState, value: Number): void {
    state.footprint.currentTab = value
  },
  TOGGLE_isLoading(state: FeatureState): void {
    state.isLoading = !state.isLoading
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
