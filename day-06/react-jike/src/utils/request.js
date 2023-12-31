// axios 封装处理
import axios from "axios"
import {getToken, removeToken} from "@/utils/token"
import router from "@/router"

// 1. 根域名配置
// 2. 超时时间
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 3. 请求拦截器 响应拦截器
// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 操作 config，注入 token 数据
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  // 监控 401 token 失效
  console.dir(error)
  if (error.response.status === 401) {
    removeToken()
    router.navigate('/login')
  }
  return Promise.reject(error)
})

export {request}
