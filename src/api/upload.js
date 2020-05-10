import { axios } from '@/utils/request'

export function uploadPic (parameter) {
  return axios({
    url: 'http://101.132.194.14/traffic/ops/mall/photo/upload',
    method: 'post',
    data: parameter
  })
}
