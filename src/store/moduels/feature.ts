interface Footprint {
  currentTab: Number
}

interface CheckIn {}

interface Notification {
  isDisplay: boolean
  message: string
  color: string
}

interface NotificationOptions {
  message: string
  color: string
}

interface FeatureState {
  footprint: Footprint
  checkIn: CheckIn
  notification: Notification
  isLoading: boolean
  hasCheckIned: boolean
}

const state: FeatureState = {
  footprint: {
    currentTab: 0
  },
  checkIn: {},
  isLoading: false,
  notification: {
    isDisplay: false,
    message: '',
    color: ''
  },
  hasCheckIned: false
}

const getters: any = {
  getFootprint(state: FeatureState): Footprint {
    return state.footprint
  },
  getIsLoading(state: FeatureState): boolean {
    return state.isLoading
  },
  getNotification(state: FeatureState): Notification {
    return state.notification
  },
  getHasCheckIned(state: FeatureState): boolean {
    return state.hasCheckIned
  }
}

const mutations: any = {
  SET_footprintCurrentTab(state: FeatureState, value: Number): void {
    state.footprint.currentTab = value
  },
  SET_notificationMessage(state: FeatureState, value: string): void {
    state.notification.message = value
  },
  SET_notificationColor(state: FeatureState, value: string): void {
    state.notification.color = value
  },
  TOGGLE_isLoading(state: FeatureState): void {
    state.isLoading = !state.isLoading
  },
  SET_notificationIsDisplay(state: FeatureState, value: boolean): void {
    state.notification.isDisplay = value
  },
  SET_hasCheckIned(state: FeatureState, value: boolean): void {
    state.hasCheckIned = value
  }
}

const actions: any = {
  openNotification(context: any, options: NotificationOptions): void {
    context.commit('SET_notificationIsDisplay', true)
    context.commit('SET_notificationColor', options.color)
    context.commit('SET_notificationMessage', options.message)
  },
  closeNotification(context: any): void {
    context.commit('SET_notificationIsDisplay', false)
    context.commit('SET_notificationColor', '')
    context.commit('SET_notificationMessage', '')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
