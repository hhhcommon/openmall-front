import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang'
import {encode, decode} from './utils'

import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
// import VueCookie from 'vue-cookie'
import { userCurrent } from './api/user'
import ElementUI from 'element-ui'
import { getStore } from '/utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css'
import { setStore } from './utils/storage'

Vue.use(VueContentPlaceholders)
Vue.use(ElementUI)

Vue.prototype.$ec= encode
Vue.prototype.$dc= decode
// Vue.prototype.$loading = ElementUI.Loading.service
// Vue.prototype.$notify = ElementUI.Notification
// Vue.prototype.$message = ElementUI.Message
Vue.use(infiniteScroll)
// Vue.use(VueCookie)
// require('./mock')
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
// console.log(Vue)
const whiteList = ['/index', '/goods','/cart','/checkout', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  let token = getStore('Authorization')
  // console.log(token)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // console.log(token)
  if (token) {
    store.commit("SET_LOGIN", true)
    store.commit("SET_TOKEN", token)
    userCurrent().then(res=>{
      store.commit("GET_USERINFO", res)
    })
    next()
  }else {
    store.commit("SET_LOGIN", false)
    store.commit("SET_TOKEN", "")
    next()
    if (whiteList.indexOf(to.path) == -1) {
      setStore('LAST_PAGE',from.path)
      next('/login')
    }else {
      next()
    }
  }
  // let params = {
  //   params: {
  //     token: token
  //   }
  // }
  // userInfo(params).then(res => {
  //   if (res.state !== 0) { // 没登录
  //     if (whiteList.indexOf(to.path) !== -1) { // 白名单
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   } else {
  //     store.commit('RECORD_USERINFO', {info: res.result})
  //     if (to.path === '/login') { //  跳转到
  //       next({path: '/'})
  //     }
  //     next()
  //   }
  // })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
