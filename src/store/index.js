import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    token: ''
  },
  mutations: {
    titleMutation (state, data) {
      state.title = data
    },
    addTokenMutation (state, data) {
      state.token = data
      localStorage.setItem('token', data)
    },
    removeTokenMutation (state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    titleAction ({ commit }, data) {
      commit('titleMutation', data)
    },
    addTokenAction ({ commit }, data) {
      commit('addTokenMutation', data)
    },
    removeTokenAction ({ commit }) {
      commit('removeTokenMutation')
    }
  },
  modules: {
  },
  getters: {
    titleGetter: state => state.title,
    tokenGetter: state => {
      const token = state.token || localStorage.getItem('token')
      return token
    }
  }
})
