import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/config/query',
    method: 'post',
    data: parameter
  })
}

export function update (parameter) {
  return axios({
    url: '/config/update',
    method: 'post',
    data: parameter
  })
}
