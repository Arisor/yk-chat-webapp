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
export function getPrivateDetail (data) {
  return request({
    url: '/private_detail',
    method: 'post',
    data
  })
}
export function savePrivateMsg (data) {
  return request({
    url: '/private_save_msg',
    method: 'post',
    data
  })
}
export function getMyFriends () {
  return request({
    url: '/get_my_friends',
    method: 'post'
  })
}
export function findPeople (data) {
  return request({
    url: '/find_people',
    method: 'post',
    data
  })
}
export function isFriend (data) {
  return request({
    url: '/is_friend',
    method: 'post',
    data
  })
}
export function requestNewFriend (data) {
  return request({
    url: '/insert_newfriends',
    method: 'post',
    data
  })
}
export function getNewFriends () {
  return request({
    url: '/get_newfriends',
    method: 'post'
  })
}
export function isRequestFriends (data) {
  return request({
    url: '/is_request_friends',
    method: 'post',
    data
  })
}
export function updateNewFriends (data) {
  return request({
    url: '/update_newfriends',
    method: 'post',
    data
  })
}
export function beFriend (data) {
  return request({
    url: '/be_friend',
    method: 'post',
    data
  })
}
export function setIsRead (data) {
  return request({
    url: '/set_is_read',
    method: 'post',
    data
  })
}
export function getUnReadCount () {
  return request({
    url: '/get_un_read_count',
    method: 'post'
  })
}
