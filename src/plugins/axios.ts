import axios from 'axios'

export default axios.create({
  baseURL: 'http://35.229.132.185:3000/',
  headers: {
    'Content-Type': 'application/json'
  }
})