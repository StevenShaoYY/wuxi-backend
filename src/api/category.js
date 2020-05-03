import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/mall/goods/category/query',
    method: 'post',
    data: parameter
  })
}

export function add (parameter) {
  return axios({
    url: '/mall/goods/category/add',
    method: 'post',
    data: parameter
  })
}

export function update (parameter) {
  return axios({
    url: '/mall/goods/category/update',
    method: 'post',
    data: parameter
  })
}
export function DeleteData (parameter) {
  return axios({
    url: '/mall/goods/category/delete',
    method: 'post',
    data: parameter
  })
}
