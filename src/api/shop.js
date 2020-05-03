import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/mall/merchant/query',
    method: 'post',
    data: parameter
  })
}

export function add (parameter) {
  return axios({
    url: '/mall/merchant/add',
    method: 'post',
    data: parameter
  })
}

export function update (parameter) {
  return axios({
    url: '/mall/merchant/update',
    method: 'post',
    data: parameter
  })
}
export function DeleteData (parameter) {
  return axios({
    url: '/mall/merchant/delete',
    method: 'post',
    data: parameter
  })
}

export function startUse (parameter) {
  return axios({
    url: '/mall/merchant/enable',
    method: 'post',
    data: parameter
  })
}

export function stopUse (parameter) {
  return axios({
    url: '/mall/merchant/disable',
    method: 'post',
    data: parameter
  })
}

export function detail (parameter) {
  return axios({
    url: '/merchant/info',
    method: 'post',
    data: parameter
  })
}
