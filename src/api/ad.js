import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/ad/query',
    method: 'post',
    data: parameter
  })
}

export function add (parameter) {
  return axios({
    url: '/ad/add',
    method: 'post',
    data: parameter
  })
}

export function update (parameter) {
  return axios({
    url: '/ad/update',
    method: 'post',
    data: parameter
  })
}
export function DeleteData (parameter) {
  return axios({
    url: '/ad/delete',
    method: 'post',
    data: parameter
  })
}

export function startUse (parameter) {
  return axios({
    url: '/ad/enable',
    method: 'post',
    data: parameter
  })
}

export function stopUse (parameter) {
  return axios({
    url: '/ad/disable',
    method: 'post',
    data: parameter
  })
}
