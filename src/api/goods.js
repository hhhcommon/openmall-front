import http from './public'
// 获取购物车列表

//*************************购物车开始***************************/

// 加入购物车
export const cartAdd = (params) => {
  return http.fetchPost('/cart/add', params)
}
// 清空购物车
export const cartClear = () => {
  return http.fetchPost('/cart/clear')
}
// 删除购物车
export const cartDelete = (params) => {
  return http.fetchPostUrl('/cart/delete', params)
}
// 获取购物车中某个商品的规格,用于重选规格
export const getProduct = (id) => {
  return http.fetchGet('/cart/getProduct/'+id, params)
}
// 购物车列表
export const cartList = () => {
  return http.fetchGet('/cart/list')
}
// 修改购物车中商品的规格
export const cartAttr = (params) => {
  return http.fetchPost('/cart/update/attr', params)
}

// 修改购物车中某个商品的数量
export const cartQuantity = (params) => {
  return http.fetchGet('/cart/update/quantity', params)
}


//*************************购物车结束***************************/

//*************************商品列表结束***************************/
// 查询商品
export const getProdctList = (params) => {
  return http.fetchGet('/search/esProduct/search', params)
}
// 商品详情
export const getProductDetail = (id) => {
  return http.fetchGet('/pms/product/info/'+ id)
}

//*************************商品列表结束***************************/

//*************************收货地址管理开始***************************/
export const getAddressList = () => {
  return http.fetchGet('/member/address/list')
}

// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('/member/address/add', params)
}
//*************************收货地址管理结束***************************/

// 确认单接口
export const confirmOrder = () => {
  return http.fetchPost('/order/generateConfirmOrder')
}
export const getCartList = (params) => {
  return http.fetchPost('/member/cartList', params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('/member/addCart', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('/member/delCart', params)
}
// 删除购物车勾选商品
export const delCartChecked = (params) => {
  return http.fetchPost('/member/delCartChecked', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('/member/cartEdit', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/member/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost('/member/cartDel', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchPost('/member/addressList', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost('/member/address', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost('/member/updateAddress', params)
}
// 删除收货地址
export const addressDel = (id) => {
  return http.fetchPost('/member/address/delete/'+ id)
}
// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('/order/generateOrder', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/member/orderList', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet('/member/orderDetail', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/member/cancelOrder', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet('/goods/productDet', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/member/delOrder', params)
}
// 商品列表
export const getSearch = (params) => {
  return http.fetchGet('/goods/search', params)
}
// 快速搜索
export const getQuickSearch = (params) => {
  return http.fetchGet('/goods/quickSearch', params)
}
