import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import login from './modules/login'

const store = createStore({
  modules: {
    user,
    login
  },
  getters
})

export default store
