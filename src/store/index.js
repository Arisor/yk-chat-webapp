import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    userInfo: {},
    msgCount: 0
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
    },
    msgCountMutation (state, data) {
      state.msgCount = data
    }
  },
  actions: {
    titleAction ({ commit }, data) {
      commit('titleMutation', data)
    },
    addUserInfoAction ({ commit }, data) {
      return commit('addUserInfoMutation', data)
    },
    removeTokenAction ({ commit }) {
      commit('removeUserInfoMutation')
    },
    msgCountAction ({ commit }, data) {
      commit('msgCountMutation', data)
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
    },
    nameGetter: state => {
      const name = state.userInfo.name || (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).name)
      return name
    },
    msgCountGetter: state => {
      return state.msgCount
    }
  }
})
