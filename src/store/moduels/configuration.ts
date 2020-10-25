import axios from '@/plugins/axios'

interface Disease {
  id: number
  name: string
}

interface Region {
  id: number
  name: string
  code: string
}

interface Rule {
  red: any
  yellow: any
}

interface ConfigurationState {
  diseases: Array<Disease>
  regions: Array<Region>
  rules: Rule
}

const state: ConfigurationState = {
  diseases: [],
  regions: [],
  rules: {
    red: {},
    yellow: {}
  }
}

const getters: any = {
  getDiseases(state: ConfigurationState): Array<Disease> {
    return state.diseases
  },
  getRegions(state: ConfigurationState): Array<Region> {
    return state.regions
  },
  getRules(state: ConfigurationState): Rule {
    return state.rules
  }
}

const mutations: any = {
  SET_diseases(state: ConfigurationState, value: any): void {
    state.diseases = value
  },
  SET_regions(state: ConfigurationState, value: any): void {
    state.regions = value
  },
  SET_rules(state: ConfigurationState, value: any): void {
    state.rules = value
  }
}

const actions: any = {
  async getConfiguration(context: any): Promise<void> {
    try {
      const { data } = await axios('/configuration', {
        method: 'GET'
      })
      context.commit('SET_diseases', data.diseases)
      context.commit('SET_regions', data.regions)
      context.commit('SET_rules', data.rules)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
