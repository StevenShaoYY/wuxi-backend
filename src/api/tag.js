import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/mall/goods/tag/query',
    method: 'post',
    data: parameter
  })
}

export function add (parameter) {
  return axios({
    url: '/mall/goods/tag/add',
    method: 'post',
    data: parameter
  })
}

export function update (parameter) {
  return axios({
    url: '/mall/goods/tag/update',
    method: 'post',
    data: parameter
  })
}
export function DeleteData (parameter) {
  return axios({
    url: '/mall/goods/tag/delete',
    method: 'post',
    data: parameter
  })
}
