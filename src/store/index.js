import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: ''
  },
  mutations: {
    titleMutation (state, data) {
      state.title = data
    }
  },
  actions: {
    titleAction ({
      commit
    }, data) {
      commit('titleMutation', data)
    }
  },
  modules: {
  },
  getters: {
    titleGetter: state => state.title
  }
})
