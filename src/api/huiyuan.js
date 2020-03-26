import { axios } from '@/utils/request'

export function getSingle (parameter) {
  return axios({
    url: '/member/query',
    method: 'post',
    data: parameter
  })
}

export function addHuiyuan (parameter) {
  return axios({
    url: '/member/add',
    method: 'post',
    data: parameter
  })
}

export function updateHuiyuan (parameter) {
  return axios({
    url: '/member/update',
    method: 'post',
    data: parameter
  })
}

export function disableSingle (parameter) {
  return axios({
    url: '/member/disable',
    method: 'post',
    data: parameter
  })
}

export function enableSingle (parameter) {
  return axios({
    url: '/member/enable',
    method: 'post',
    data: parameter
  })
}

export function deleteSingle (parameter) {
  return axios({
    url: '/member/delete',
    method: 'post',
    data: parameter
  })
}

export function getBase (parameter) {
  return axios({
    url: '/admin/getDictionaryAll',
    method: 'post',
    data: parameter
  })
}

export function replyList (parameter) {
  return axios({
    url: '/feedback/query',
    method: 'post',
    data: parameter
  })
}

export function replyDelete (parameter) {
  return axios({
    url: '/feedback/delete',
    method: 'post',
    data: parameter
  })
}
