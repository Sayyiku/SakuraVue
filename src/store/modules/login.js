import {getPassword, getUsername, removePassword, removeUsername, setPassword, setUsername} from '../../utils/auth'

const state = {
  visible: false,
  logonShow: true,
  isLogin: false,
  isPassword: false,
  isMobile: false,
  isChangeMobile: Boolean,
  username: getUsername(),
  password: getPassword()
}

const mutations = {
  CHANGE_VISIBLE: (state, value) => {
    state.visible = !state.visible
  },

  SET_USERNAME: (state, value) => {
    state.username = value
  },

  SET_PASSWORD: (state, value) => {
    state.password = value
  },

  CHANGE_LOGONSHOW: (state) => {
    state.logonShow = !state.logonShow
  },

  CHANGE_ISLOGIN: (state) => {
    state.isLogin = !state.isLogin
  },

  CHANGE_ISPASSWORD: (state) => {
    state.isPassword = !state.isPassword
  },

  CHANGE_ISMOBILE: (state) => {
    state.isMobile = !state.isMobile
  },

  CHANGE_ISCHANGEMOBILE: (state,value) => {
    state.isChangeMobile = value
  },
}

const actions = {

  /**
   * 记住用户名和密码
   */
  setUsernameAndPassword({commit}, params) {
    return new Promise((resolve, reject) => {
      const username = params.username
      const password = params.password
      commit('SET_USERNAME', username)
      commit('SET_PASSWORD', password)
      setUsername(username)
      setPassword(password)
      resolve()
    }).catch(error => {
      reject(error)
    })
  },

  /**
   * 清除用户和密码
   */
  clearUsernameAndPassword({commit}, params) {
    return new Promise((resolve, reject) => {
      commit('SET_USERNAME', '')
      commit('SET_PASSWORD', '')
      removeUsername()
      removePassword()
      resolve()
    }).catch(error => {
      reject(error)
    })
  },

  /**
   * 改变登录页状态
   */
  changeLogonShow({commit}, data) {
    return new Promise((resolve, reject) => {
      commit('CHANGE_LOGONSHOW', '')
      resolve()
    }).catch(error => {
      reject(error)
    })
  },

  /**
   * 改变登录页状态
   */
  changeIsLogin({commit}, data) {
    return new Promise((resolve, reject) => {
      commit("CHANGE_ISLOGIN", '')
      resolve()
    }).catch(error => {
      reject(error)
    })
  },

  /**
   * 改变搜索页状态
   */
  changeIsVisible({commit}, data) {
    return new Promise((resolve, reject) => {
      commit("CHANGE_VISIBLE")
    })
  },

  /**
   * 改变修改密码页状态
   */
  changeIsPassword({commit}, data) {
    return new Promise((resolve, reject) => {
      commit("CHANGE_ISPASSWORD")
    })
  },

  /**
   * 改变手机号页面状态
   */
  changeIsMobile({commit}, data) {
    return new Promise((resolve, reject) => {
      commit("CHANGE_ISMOBILE")
      data === 1 ? commit("CHANGE_ISCHANGEMOBILE", true) : commit("CHANGE_ISCHANGEMOBILE", false)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
