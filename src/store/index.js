import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'
Vue.use(Vuex)

const state = {
  login: false,   // 是否登录
  token: '',
  userInfo: null, // 用户信息
  userId: '',
  nickname: '',
  cartList: [],   // 加入购物车列表
  showMoveImg: false, // 显示飞入图片
  elLeft: 0,
  elTop: 0,
  localeLanguage: '',
  moveImgUrl: null,
  cartPositionT: 0, // 购物车位置
  cartPositionL: 1920,
  receiveInCart: false, // 是否进入购物车
  showCart: false, // 是否显示购物车
  lastPage: '',
  list: []
}

export default new Vuex.Store({
  state,
  action,
  mutations
})
