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
