import http from './public'

//*************************首页接口开始***************************/
// 首页获取内容
export const homeContent = (params) => {
  return http.fetchGet('/home/content', params)
}
// 获取分类
export const productCateList = (id) => {
  return http.fetchGet('/home/productCateList/' + id)
}
// 分页获取推荐商品
export const recommendProductList = (params) => {
  return http.fetchGet('/home/recommendProductList/',params)
}
// 根据分类获取专题
export const subjectList = (params) => {
  return http.fetchGet('/home/subjectList/',params)
}
//*************************首页接口结束***************************/

//*************************会员登录注册接口开始***************************/


// 用户信息
export const userInfo = (params) => {
  return http.fetchGet('/member/checkLogin', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/member/updateheadimage', params)
}
// 捐赠列表
export const thanksList = (params) => {
  return http.fetchGet('/member/thanks', params)
}
// 捐赠列表
export const upload = (params) => {
  return http.fetchGet('/member/thanks', params)
}

// 首页接口
export const navList = (params) => {
  return http.fetchGet('/goods/navList', params)
}
// 推荐板块
export const recommend = (params) => {
  return http.fetchGet('/goods/recommend', params)
}
// 捐赠板块
export const thank = (params) => {
  return http.fetchGet('/goods/thank', params)
}
// 极验验证码
// export const geetest = (params) => {
//   return http.fetchGet('/member/geetestInit?t=' + (new Date()).getTime(), params)
// }

