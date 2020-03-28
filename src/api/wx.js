import { axios } from '@/utils/request'

export function getwxList (parameter) {
  return axios({
    url: '/weixin/queryNews',
    method: 'post',
    data: parameter
  })
}

export function deleteWx (parameter) {
  return axios({
    url: '/weixin/deleteNews',
    method: 'post',
    data: parameter
  })
}

export function sendNews (parameter) {
  return axios({
    url: '/weixin/sendNews',
    method: 'post',
    data: parameter
  })
}

export function getTag (parameter) {
  return axios({
    url: '/weixin/queryTag',
    method: 'post',
    data: parameter
  })
}
