interface UserState {
  avatar: string,
  id: string,
  username: string
}



const state: UserState = {
  avatar: '',
  id: '',
  username: ''
}

const getters: any = {
  getAvatar (state: UserState): string {
    return state.avatar
  }
}

const mutations: any = {
  setAvatar (state: UserState, value: string): void {
    state.avatar = value
  },
  setUser (state: UserState, value: any): void {
    state.id = value.id
    state.username = value.username
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