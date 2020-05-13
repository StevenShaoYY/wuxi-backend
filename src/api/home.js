import { axios } from '@/utils/request'

export function getHome1 (parameter) {
  return axios({
    url: '/admin/statisticInfo',
    method: 'post',
    data: parameter
  })
}

export function getHome2 (parameter) {
  return axios({
    url: '/admin/statisticMember',
    method: 'post',
    data: parameter
  })
}
export function getHome3 (parameter) {
  return axios({
    url: '/admin/statisticOrder',
    method: 'post',
    data: parameter
  })
}
export function getHome4 (parameter) {
  return axios({
    url: '/admin/statisticRank',
    method: 'post',
    data: parameter
  })
}
