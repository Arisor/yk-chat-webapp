import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function register (data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
export function getMsg (data) {
  return request({
    url: '/message',
    method: 'post',
    data
  })
}
