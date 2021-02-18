import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from './snackbar'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    snackbar,
    users
  }
})
