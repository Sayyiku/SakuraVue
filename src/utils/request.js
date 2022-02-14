import axios from 'axios'
import {ElMessage, ElNotification} from 'element-plus'
import store from '../store'
import {getAccessToken} from './auth'
import {h} from "vue";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 10000
})

const reminder = () => {
  ElNotification({
    title: '提示',
    message: h('i', { style: 'color: #fe9600' }, '登录信息过期，请重新登录'),
  })
}

// 请求拦截器
service.interceptors.request.use(
  config => {
      NProgress.start()
    // 添加请求头
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getAccessToken()
    }

      return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
      NProgress.done()
    const res = response.data
    if (res.code !== 0) {
      // 凭证无效或过期
      if (res.code === 1006 || res.code === 1009) {
        store.dispatch('user/resetToken')
        // debounce(reminder, 500)
      } else {
        store.dispatch('user/resetToken')
        ElMessage.error(res.message || "Error")
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)



export default service
