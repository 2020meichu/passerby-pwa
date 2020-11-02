import axios from '@/plugins/axios'

interface FootprintRecord {
  longitude: number;
  latitude: number;
  location: string;
  address: string;
  time: string;
}

interface DepartureRecord {
  date: Date;
  to: string;
}

interface ArrivalRecord {
  date: Date;
  from: string;
}

interface InfectedRecord {
  diseaseId: number;
  date: Date;
  recover: boolean;
}

interface QuarantineRecord {
  start: Date;
  end: Date;
}

interface UserState {
  avatar: string;
  id: string;
  username: string;
  footprints: Array<FootprintRecord>;
  departures: Array<DepartureRecord>;
  arrivals: Array<ArrivalRecord>;
  infected: Array<InfectedRecord>;
  quarantine: Array<QuarantineRecord>;
}

const state: UserState = {
  avatar: '',
  id: '',
  username: 'Mia',
  footprints: [
    {
      longitude: 120.9885448,
      latitude: 24.7944173,
      location: '清大體育館',
      address: '300 新竹市東區光復路二段 101 號',
      time: new Date().toISOString()
    }
  ],
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
  getInfected (state: UserState): Array<InfectedRecord> {
    return state.infected
  },
  getDepartures (state: UserState): Array<DepartureRecord> {
    return state.departures
  },
  getArrivals (state: UserState): Array<ArrivalRecord> {
    return state.arrivals
  },
  getQuarantine (state: UserState): Array<QuarantineRecord> {
    return state.quarantine
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
  },
  SET_footprints (state: UserState, value: any): void {
    state.footprints = value
  }
}

const actions: any = {
  async getUserData (context: any): Promise<void> {
    const token = localStorage.token
    if (!token) {
      return
    }

    const { data } = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    data.user.avatar = `${process.env.VUE_APP_API_ENDPOINT}${data.user.avatar}`
    context.commit('SET_user', data.user)
  },
  async register (context: any, options: any): Promise<void> {
    const formData: FormData = new FormData()
    Object.keys(options).forEach((key: string): void => {
      formData.append(key, options[key])
    })
    const { data } = await axios.post('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // Save the token to local storage
    localStorage.token = data.token
    data.user.avatar = `${process.env.VUE_APP_API_ENDPOINT}/${data.user.avatar}`
    context.commit('SET_user', data.user)
  },
  async login (context: any, options: any): Promise<void> {
    const { data } = await axios.post('/login', options)
    // Save the token to local storage
    localStorage.token = data.token
    data.user.avatar = `${process.env.VUE_APP_API_ENDPOINT}/${data.user.avatar}`
    context.commit('SET_user', data.user)
  },
  async getCurrentLightInfo (context: any): Promise<any> {
    const rules = JSON.parse(JSON.stringify(context.rootGetters['configuration/getRules']))

    Object.keys(rules).forEach((type: string): void => {
      Object.keys(rules[type].diseases).forEach((target: string): any => {
        const infected: InfectedRecord = context.state.infected.find((iter: any): boolean => iter.diseaseId == target)
        if (!infected) {
          delete rules[type].diseases[target]
          return
        }
        const diff = Math.floor((new Date().getTime() - new Date(infected.date).getTime()) / (1000 * 60 * 60 * 24))
        rules[type].diseases[target] = diff < rules[type].diseases[target]
      })

      Object.keys(rules[type].regions).forEach((target: string): any => {
        const departure: DepartureRecord = context.state.departures.find((iter: any): boolean => iter.to == target)
        const arrival: ArrivalRecord = context.state.arrivals.find((iter: any): boolean => iter.from == target)
        if (!departure && !arrival) {
          delete rules[type].regions[target]
        } else if (departure && !arrival) {
          const diffDeparture = Math.floor((new Date().getTime() - new Date(departure.date).getTime()) / (1000 * 60 * 60 * 24))
          rules[type].regions[target] = diffDeparture < rules[type].regions[target]
        } else if (!departure && arrival) {
          const diffArrival = Math.floor((new Date().getTime() - new Date(arrival.date).getTime()) / (1000 * 60 * 60 * 24))
          rules[type].regions[target] = diffArrival < rules[type].regions[target]
        } else {
          const diffDeparture = Math.floor((new Date().getTime() - new Date(departure.date).getTime()) / (1000 * 60 * 60 * 24))
          const diffArrival = Math.floor((new Date().getTime() - new Date(arrival.date).getTime()) / (1000 * 60 * 60 * 24))
          rules[type].regions[target] = diffDeparture < rules[type].regions[target] || diffArrival < rules[type].regions[target]
        }
      })

      const lastQuarantine: QuarantineRecord = context.state.quarantine.sort((a: QuarantineRecord, b: QuarantineRecord): number => new Date(a.end).getTime() - new Date(b.end).getTime())[0]
      if (!lastQuarantine) {
        rules[type].quarantine = false
        return
      }
      rules[type].quarantine = Math.floor((new Date().getTime() - new Date(lastQuarantine.end).getTime()) / (1000 * 60 * 60 * 24)) < rules[type].quarantine
    })
    return rules
  },
  async checkIn (context: any, options: any): Promise<void> {
    try {
      const token = localStorage.token
      const { data } = await axios('/user/footprints', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'POST',
        data: options
      })
      context.commit('SET_footprints', data.footprints)
    } catch (error) {
      throw error
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
