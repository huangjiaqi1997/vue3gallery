import { Message } from '@/libs'
import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    // 包含 /user/ 的请求要携带 token 请求头
    if (/\/user\//.test(config.url)) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 图片上传
    // if (config.baseURL === '/images') {
    //   const {
    //     credentials: { AccessKeyId, SecurityToken },
    //     file
    //   } = config.data
    //   config.headers.Authorization = `OSS ${AccessKeyId}`
    //   config.headers['x-oss-security-token'] = SecurityToken
    //   config.data = file
    // }
    return config
  },
  (error) => {
    return reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    // response.status 2xx 范围内的状态码都会触发该函数。
    const { success, message, data } = res.data
    if (success) {
      return data
    }
    // 处理图片请求
    if (res.config.responseType === 'blob' && res.status === 200) {
      return res.data
    }
    // 除了 res.data.success === true 的，其他结果全部当作异常处理
    else {
      return Promise.reject(message)
    }
  },
  (error) => {
    console.log('', error)
    // 超出 2xx 范围的状态码都会触发该函数。
    const { message, code } = error.response.data
    // token 过期处理
    if (code === 401) {
      store.commit('logout')
    }
    Message({ type: 'error', message: '登录已过期，请重新登录' })
    return Promise.reject(message)
  }
)

export default service
