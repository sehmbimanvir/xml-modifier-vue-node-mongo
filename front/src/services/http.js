import Axios from 'axios'
import Store from '../stores/index'
import { Storage } from '../services/storage'

const HTTP = Axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

HTTP.interceptors.response.use(success => {
  return success
}, error => {
  Store.commit('MiscStore/CATCHERROR', error)
  return Promise.reject(error)
})

HTTP.interceptors.request.use(config => {
  config.headers['x-access-token'] = `${Storage.get('token')}`
  return config
})

export { HTTP }
