import axios from 'axios'
import {getStore} from '../utils/storage'

axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // 配置请求头

// 添加拦截器，在请求头中加入 token
axios.interceptors.request.use(
  config=>{
    let accessToken = getStore('Authorization')
    if(accessToken){
      config.headers.Authorization = accessToken
    }
    return config
  },
  error=>{
    return Promise.reject(err)
  }
)

// http拦截器
// axios.interceptors.response.use(
//   response =>{
//     let resetTime = getStore('resetTime')
//   }
// )


export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'get',
        url: process.env.BASE_API + url,
        params: params,
      }).then(res=>{
        resolve(res.data)
      }).catch(error=>{
        reject(error)
      })
    })
  },
  fetchPost (url, params) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'post',
        url: process.env.BASE_API + url,
        headers: {
          "Content-Type": "application/json;"
        },
        data: params,
      }).then(res=>{
        // console.log(res)
        resolve(res.data)
      }).catch(error=>{
        reject(error)
      })
    })
  },
  fetchPostUrl (url, params) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'post',
        url: process.env.BASE_API + url,
        params: params,
      }).then(res=>{
        // console.log(res)
        resolve(res.data)
      }).catch(error=>{
        reject(error)
      })
    })
  }
}
