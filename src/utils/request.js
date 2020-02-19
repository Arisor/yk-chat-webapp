import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.tokenGetter) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = store.getters.tokenGetter
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.status === 200) {
      const res = response.data
      if (res.success) {
        return Promise.resolve(res)
      } else {
        Toast(res.message)
        return Promise.reject(new Error(res.message || 'Error'))
      }
    } else {
      Toast('系统繁忙')
      return Promise.reject(new Error(response.statusText || 'Error'))
    }
  },
  error => {
    if (error.response.status === 401) {
      // 未授权返回登录页
      store.dispatch('removeTokenAction')
      router.push({
        name: 'login'
      })
    }
    // console.log(error.response) // for debug
    return Promise.reject(error)
  }
)

export default service
