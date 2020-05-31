import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/member/queryBill',
    method: 'post',
    data: parameter
  })
}

export function statisticBill (parameter) {
  return axios({
    url: '/member/statisticBill',
    method: 'post',
    data: parameter
  })
}

export function DeleteData (parameter) {
  return axios({
    url: '/member/deleteBill',
    method: 'post',
    data: parameter
  })
}
