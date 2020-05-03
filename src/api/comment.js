import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/mall/comment/query',
    method: 'post',
    data: parameter
  })
}

export function DeleteData (parameter) {
  return axios({
    url: '/mall/comment/delete',
    method: 'post',
    data: parameter
  })
}

export function reply (parameter) {
  return axios({
    url: '/mall/comment/reply',
    method: 'post',
    data: parameter
  })
}
