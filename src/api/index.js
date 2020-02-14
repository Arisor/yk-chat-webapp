import request from '@/utils/request'

export function login () {
  return request({
    url: 'login',
    method: 'post',
    data: {
      name: '123',
      password: '456'
    }
  })
}
