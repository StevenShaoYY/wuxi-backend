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

export function reply (parameter) {
  return axios({
    url: '/feedback/reply',
    method: 'post',
    data: parameter
  })
}

export function getAuthList (parameter) {
  return axios({
    url: '/member/queryAuth',
    method: 'post',
    data: parameter
  })
}
export function deleteAuth (parameter) {
  return axios({
    url: '/member/deleteAuth',
    method: 'post',
    data: parameter
  })
}
export function doAuth (parameter) {
  return axios({
    url: '/member/processAuth',
    method: 'post',
    data: parameter
  })
}

export function returnFund (parameter) {
  return axios({
    url: '/member/refundAuth',
    method: 'post',
    data: parameter
  })
}

export function getComList (parameter) {
  return axios({
    url: '/member/getCompanyAll',
    method: 'post',
    data: parameter
  })
}

export function read (parameter) {
  return axios({
    url: '/feedback/read',
    method: 'post',
    data: parameter
  })
}

export function exportHuiyuan (parameter) {
  return axios({
    url: '/member/exportUrl',
    method: 'post',
    data: parameter
  })
}
