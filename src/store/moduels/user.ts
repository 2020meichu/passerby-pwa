interface FootprintRecord {
  longitude: Number,
  latitude: Number,
  location: String,
  address: String,
  time: Date
}

interface DepartureRecord {
  date: Date,
  to: String
}

interface ArrivalRecord {
  date: Date,
  from: String
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
  }
}

const mutations: any = {
  setAvatar (state: UserState, value: string): void {
    state.avatar = value
  },
  setUser (state: UserState, value: any): void {
    state.id = value.id
    state.username = value.username
    state.footprints = value.footprints
    state.departures = value.departures
    state.arrivals = value.arrivals
    state.quarantine = value.quarantine
    state.infected = value.infected
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