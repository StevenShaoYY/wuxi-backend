import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/weixin/queryMenu',
    method: 'post',
    data: parameter
  })
}

export function update (parameter) {
  return axios({
    url: '/weixin/updateMenu',
    method: 'post',
    data: parameter
  })
}
export function syncMenu (parameter) {
  return axios({
    url: '/weixin/syncMenu',
    method: 'post',
    data: parameter
  })
}
