import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'; //设置
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission';//权限
import getters from './getters'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings,
    app,
    user,
    permission
  },
  getters,
  plugins: [
    createPersistedState(),
    //createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})

export default store
