import { message } from 'ant-design-vue'
import axios from 'axios'
const request = axios.create({
  baseURL: `${import.meta.env.VITE_APP_CMS}`,
  timeout: 5000,
})
request.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = localStorage.getItem('token')
  }
  return config
})
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let msg = ''
    let status = error.response.status
    switch (status) {
      case 401: {
        msg = 'token过期'
        localStorage.setItem('token', '')
        window.location.href = '/#/login'
        break
      }
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    message.error(msg)
    return Promise.reject(error)
  },
)
export default request
