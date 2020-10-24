import axios from '@/plugins/axios'

interface FootprintRecord {
  longitude: Number,
  latitude: Number,
  location: string,
  address: string,
  time: Date
}

interface DepartureRecord {
  date: Date,
  to: string
}

interface ArrivalRecord {
  date: Date,
  from: string
}

interface InfectedRecord {
  disease_id: Number,
  date: Date,
  recover: boolean
}

interface QuarantineRecord {
  start: Date,
  end: Date
}

interface UserState {
  avatar: string,
  id: string,
  username: string,
  footprints: Array<FootprintRecord>,
  departures: Array<DepartureRecord>,
  arrivals: Array<ArrivalRecord>,
  infected: Array<InfectedRecord>,
  quarantine: Array<QuarantineRecord>
}



const state: UserState = {
  avatar: '',
  id: '',
  username: '',
  footprints: [{
    longitude: 120.9885448,
    latitude: 24.7944173,
    location: '清大體育館',
    address: '300 新竹市東區光復路二段 101 號',
    time: new Date()
  }, {
    longitude: 120.9885448,
    latitude: 24.7944173,
    location: '清大體育館',
    address: '300 新竹市東區光復路二段 101 號',
    time: new Date()
  }, {
    longitude: 120.9885448,
    latitude: 24.7944173,
    location: '清大體育館',
    address: '300 新竹市東區光復路二段 101 號',
    time: new Date()
  }, {
    longitude: 120.9885448,
    latitude: 24.7944173,
    location: '清大體育館',
    address: '300 新竹市東區光復路二段 101 號',
    time: new Date()
  }, {
    longitude: 120.9885448,
    latitude: 24.7944173,
    location: '清大體育館',
    address: '300 新竹市東區光復路二段 101 號',
    time: new Date()
  }, {
    longitude: 120.9885448,
    latitude: 24.7944173,
    location: '清大體育館',
    address: '300 新竹市東區光復路二段 101 號',
    time: new Date()
  }, {
    longitude: 120.9885448,
    latitude: 24.7944173,
    location: '清大體育館',
    address: '300 新竹市東區光復路二段 101 號',
    time: new Date()
  }],
  departures: [],
  arrivals: [],
  quarantine: [],
  infected: []
}

const getters: any = {
  getAvatar (state: UserState): string {
    return state.avatar
  },
  getFootprints (state: UserState): Array<FootprintRecord> {
    return state.footprints
  },
  getUsername (state: UserState): string {
    return state.username
  },
  getUserAvatar (state: UserState): string {
    return state.avatar
  }
}

const mutations: any = {
  SET_user (state: UserState, value: any): void {
    state.id = value.id
    state.username = value.username
    state.footprints = value.footprints
    state.departures = value.departures
    state.arrivals = value.arrivals
    state.quarantine = value.quarantine
    state.infected = value.infected
    state.avatar = value.avatar
  }
}

const actions: any = {
  async getUserData(context: any): Promise<void> {
    const token = localStorage['token']
    if (!token) { return }

    const { data } = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    data.user.avatar = `${process.env.VUE_APP_API_ENDPOINT}${data.user.avatar}`
    context.commit('SET_user', data.user)
  },
  async register(context: any, options: any): Promise<void> {
    const formData:FormData = new FormData()
    Object.keys(options).forEach((key: string): void => {
      formData.append(key, options[key])
    })
    const { data } = await axios.post('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // Save the token to local storage
    localStorage['token'] = data.token
    data.user.avatar = `${process.env.VUE_APP_API_ENDPOINT}/${data.user.avatar}`
    context.commit('SET_user', data.user)
  },
  async login(context: any, options: any): Promise<void> {
    const { data } = await axios.post('/login', options)
    // Save the token to local storage
    localStorage['token'] = data.token
    data.user.avatar = `${process.env.VUE_APP_API_ENDPOINT}/${data.user.avatar}`
    context.commit('SET_user', data.user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}