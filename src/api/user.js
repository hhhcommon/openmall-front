import http from './public'

// 登录
export const userLogin = (params) => {
    return http.fetchPostUrl('/sso/login', params)
}
// 注册
export const register = (params) => {
    return http.fetchPostUrl('/sso/register', params)
}
// 修改密码
export const updatePassword = (params) => {
    return http.fetchPost('/sso/updatePassword', params)
}
// 退出登陆
export const loginOut = (params) => {
    return http.fetchGet('/member/loginOut', params)
}

// 当前用户信息
export const userCurrent = () => {
    return http.fetchGet('/sso/current', '')
}

// GET /sso/current

  //*************************会员登录注册接口结束***************************/
