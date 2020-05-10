import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/advertise/query',
    method: 'post',
    data: parameter
  })
}

export function add (parameter) {
  return axios({
    url: '/advertise/add',
    method: 'post',
    data: parameter
  })
}

export function update (parameter) {
  return axios({
    url: '/advertise/update',
    method: 'post',
    data: parameter
  })
}
export function DeleteData (parameter) {
  return axios({
    url: '/advertise/delete',
    method: 'post',
    data: parameter
  })
}

export function startUse (parameter) {
  return axios({
    url: '/advertise/enable',
    method: 'post',
    data: parameter
  })
}

export function stopUse (parameter) {
  return axios({
    url: '/advertise/disable',
    method: 'post',
    data: parameter
  })
}
