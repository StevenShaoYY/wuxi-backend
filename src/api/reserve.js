import { axios } from '@/utils/request'

export function replyList (parameter) {
  return axios({
    url: '/reserve/query',
    method: 'post',
    data: parameter
  })
}

export function replyDelete (parameter) {
  return axios({
    url: '/reserve/delete',
    method: 'post',
    data: parameter
  })
}

export function read (parameter) {
  return axios({
    url: '/reserve/read',
    method: 'post',
    data: parameter
  })
}

export function reply (parameter) {
  return axios({
    url: '/reserve/reply',
    method: 'post',
    data: parameter
  })
}
