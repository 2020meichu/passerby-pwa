import axios from 'axios'

export default axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.VUE_APP_API_KEY
  }
})