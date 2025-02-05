import request from '@/utils/request'

export const register = (data) =>
  request({
    url: '/sys/register',
    method: 'POST',
    data
  })

export const verifyCaptcha = (behavior) =>
  request.post('/sys/captcha', behavior)

export const login = (params) => request.post('/sys/login', params)

export const getUserInfo = () => request.get('/user/profile')

export const updateUserInfo = (data) =>
  request({
    url: '/user/profile',
    method: 'PUT',
    data
  })

export const getVipCombos = () => {
  return request({
    url: '/user/vip/pay/list',
    method: 'GET'
  })
}
