import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/mall/goods/query',
    method: 'post',
    data: parameter
  })
}

export function add (parameter) {
  return axios({
    url: '/mall/goods/add',
    method: 'post',
    data: parameter
  })
}

export function update (parameter) {
  return axios({
    url: '/mall/goods/update',
    method: 'post',
    data: parameter
  })
}

export function auth (parameter) {
  return axios({
    url: '/mall/goods/auth',
    method: 'post',
    data: parameter
  })
}

export function DeleteData (parameter) {
  return axios({
    url: '/mall/goods/delete',
    method: 'post',
    data: parameter
  })
}

export function startUse (parameter) {
  return axios({
    url: '/mall/goods/upperShelf',
    method: 'post',
    data: parameter
  })
}

export function stopUse (parameter) {
  return axios({
    url: '/mall/goods/lowerShelf',
    method: 'post',
    data: parameter
  })
}

export function detail (parameter) {
  return axios({
    url: '/mall/goods/info',
    method: 'post',
    data: parameter
  })
}
