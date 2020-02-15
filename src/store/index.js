import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    // token: '',
    userInfo: {}
  },
  mutations: {
    titleMutation (state, data) {
      state.title = data
    },
    addUserInfoMutation (state, data) {
      state.userInfo = data
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    removeUserInfoMutation (state) {
      state.userInfo = {}
      localStorage.removeItem('userInfo')
    }

  },
  actions: {
    titleAction ({ commit }, data) {
      commit('titleMutation', data)
    },
    addUserInfoAction ({ commit }, data) {
      commit('addUserInfoMutation', data)
    },
    removeTokenAction ({ commit }) {
      commit('removeUserInfoMutation')
    }
  },
  modules: {
  },
  getters: {
    titleGetter: state => state.title,
    tokenGetter: state => {
      const token = state.userInfo.token || (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).token)
      return token
    },
    userIdGetter: state => {
      const userId = state.userInfo.user_id || (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).user_id)
      return userId
    }
  }
})
