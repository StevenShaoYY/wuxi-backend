import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/mall/order/query',
    method: 'post',
    data: parameter
  })
}

export function DeleteData (parameter) {
  return axios({
    url: '/mall/order/delete',
    method: 'post',
    data: parameter
  })
}

export function auth (parameter) {
  return axios({
    url: '/mall/order/auth',
    method: 'post',
    data: parameter
  })
}

export function refund (parameter) {
  return axios({
    url: '/mall/order/refund',
    method: 'post',
    data: parameter
  })
}

export function detail (parameter) {
  return axios({
    url: '/order/info',
    method: 'post',
    data: parameter
  })
}
