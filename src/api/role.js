import { axios } from '@/utils/request'

export function getAdmin (parameter) {
  return axios({
    url: '/admin/query',
    method: 'post',
    data: parameter
  })
}

export function addAdmin (parameter) {
  return axios({
    url: '/admin/add',
    method: 'post',
    data: parameter
  })
}

export function updateAdmin (parameter) {
  return axios({
    url: '/admin/update',
    method: 'post',
    data: parameter
  })
}

export function disableAdmin (parameter) {
  return axios({
    url: '/admin/disable',
    method: 'post',
    data: parameter
  })
}

export function enableAdmin (parameter) {
  return axios({
    url: '/admin/enable',
    method: 'post',
    data: parameter
  })
}

export function deleteAdmin (parameter) {
  return axios({
    url: '/admin/delete',
    method: 'post',
    data: parameter
  })
}

export function resetPassAdmin (parameter) {
  return axios({
    url: '/admin/resetPassword',
    method: 'post',
    data: parameter
  })
}

export function getRoleAll (parameter) {
  return axios({
    url: '/role/getRoleAll',
    method: 'post',
    data: parameter
  })
}
export function getRoleList (parameter) {
  return axios({
    url: '/role/query',
    method: 'post',
    data: parameter
  })
}
export function addRole (parameter) {
  return axios({
    url: '/role/add',
    method: 'post',
    data: parameter
  })
}
export function updateRole (parameter) {
  return axios({
    url: '/role/update',
    method: 'post',
    data: parameter
  })
}
export function deleteRole (parameter) {
  return axios({
    url: '/role/delete',
    method: 'post',
    data: parameter
  })
}
export function getModule (parameter) {
  return axios({
    url: '/role/getModuleAll',
    method: 'post',
    data: parameter
  })
}
