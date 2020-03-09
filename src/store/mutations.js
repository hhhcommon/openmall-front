import {
  INIT_BUYCART,
  ADD_CART,
  GET_USERINFO,
  RECORD_USERINFO,
  ADD_ANIMATION,
  SHOW_CART,
  REDUCE_CART,
  EDIT_CART,
  ADD_LIST,
  SET_LOGIN,
  SET_TOKEN,
  SET_LAST_PAGE,
  DEL_CART
} from './mutation-types'
import { setStore, getStore } from '../utils/storage'
export default {
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART] (state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 设置登录状态
  [SET_LOGIN](state, loginState) {
    state.login = loginState
  },
  [SET_TOKEN](state,token){
    state.token = token
  },
  // 加入购物车
  [ADD_CART] (state, {id, price, productName, productPic, quantity = 1}) {
    // console.log(productImg)
    let cart = state.cartList // 购物车
    let falg = true
    let goods = {
      id,
      price,
      productName,
      productPic
    }
    // console.log(goods)
    // console.log(cart)
    if (cart.length) {        // 有内容
      cart.forEach(item => {
        if (item.id === id) {
          if (item.quantity >= 0) {
            falg = false
            item.quantity += quantity
          }
        }
      })
    }
    if (!cart.length || falg) {
      goods.quantity = quantity
      goods.checked = '1'
      cart.push(goods)
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', cart)
  },
  // 加入购物车动画
  [ADD_ANIMATION] (state, {moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart}) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  [SHOW_CART] (state, {showCart}) {
    // let timer = null
    state.showCart = showCart
    // clearTimeout(timer)
    // if (showCart) {
    //   timer = setTimeout(() => {
    //     state.showCart = false
    //   }, 5000)
    // }
  },
  // 移除商品
  [REDUCE_CART] (state, {productId}) {
    let cart = state.cartList
    cart.forEach((item, i) => {
      if (item.productId === productId) {
        if (item.productNum > 1) {
          item.productNum--
        } else {
          cart.splice(i, 1)
        }
      }
    })
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
    
  },
  // 修改购物车
  [EDIT_CART] (state, {productId, quantity, checked}) {
    let cart = state.cartList
    // 全选 反选
    if(!productId){
      cart.forEach(item=>{
        item.checked = checked
      })
    }else if(quantity) {
      cart.forEach(item=>{
        if(item.productId === item.productId){
          item.quantity = quantity
        }
      })
    }else {
      // console.log(productId)
      cart.forEach(item=>{
        if(productId === item.productId){
          item.checked = checked
        }
      })
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  [DEL_CART](state,{id}){
    // console.log(productId)
    let cart = state.cartList
    state.cartList = cart.filter(item=>item.id !== id)
    setStore('buyCart', state.cartList)
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('userInfo', info)
  },
  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
      state.userId = info.id
      state.nickname = info.nickname
    } else {
      state.userInfo = null
    }
  },
  // 移除商品
  [ADD_LIST] (state, list) {
    state.list = list
    // 存入localStorage
  },
  // 设置登陆前最后一个页面
  [SET_LAST_PAGE](state, lastpage){
    state.lastpage = lastpage
  }
}
