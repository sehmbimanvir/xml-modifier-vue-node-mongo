import { HTTP } from '../services/http'
import { Storage } from '../services/storage'
const namespaced = true

const state = {
  user: Storage.getJSON('user'),
  token: Storage.get('token'),
  isLoggedIn: Storage.get('token') || false
}

const mutations = {
  'SETUSER' (state, data) {
    state.token = data.token
    state.user = data
    state.isLoggedIn = true
    Storage.setJSON('user', data)
    Storage.set('token', data.token)
  },
  'UNSETUSER' (state) {
    state.token = null
    state.user = {}
    state.isLoggedIn = false
    Storage.remove(['token', 'user'])
  },
  'UPDATEUSER' (state, data) {
    state.user.name = data.name
    state.user.email = data.email
    Storage.setJSON('user', state.user)
  }
}

const actions = {
  login: ({ commit }, user) => {
    return HTTP.post('auth/login', user).then(response => {
      let data = response.data.data
      commit('SETUSER', data)
      return response
    })
  },
  logout: ({ commit }) => {
    return HTTP.post('auth/logout', {}).then(response => {
      commit('UNSETUSER')
      return response
    })
  },
  register: ({ commit }, data) => {
    return HTTP.post('auth/register', data).then(response => {
      return response
    })
  },
  sendLoginLink: ({ commit }, data) => {
    return HTTP.post('auth/send-login-link', data).then(response => {
      return response
    })
  },
  loginWithGoogle: ({ commit }, data) => {
    return HTTP.post('auth/google', data).then(response => {
      commit('SETUSER', response.data.data)
      return response
    })
  }
}

const getters = {
  user: state => state.user,
  token: state => state.token,
  isLoggedIn: state => state.isLoggedIn
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
