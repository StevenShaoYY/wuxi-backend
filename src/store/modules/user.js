import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    userId: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          console.log(response)
          const result = response.result
          Vue.ls.set(ACCESS_TOKEN, response.message, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', response.message)
          commit('SET_USERID', result.id)
          localStorage.setItem('SET_USERID', result.id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo({
          id: localStorage.getItem('SET_USERID')
        }).then(response => {
          const result = response.result
          console.log(222222, result)
          if (result.modulesName && result.modulesName.length > 0) {
            const role = {}
            role.name = result.name
            role.id = result.id
            role.permissionList = result.modulesName
            result.role = role
            console.log(8888, role)
            commit('SET_ROLES', role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          // result.roleId = 1
          // result.role = {
          //   id: 'admin',
          //   name: '管理员',
          //   permissions: [
          //     {
          //       roleId: 'admin',
          //       permissionId: 'dashboard',
          //       permissionName: '仪表盘'
          //     }
          //   ],
          //   permissionList: ['dashboard']
          // }
          // commit('SET_INFO', result)
          // commit('SET_ROLES', result.role)
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          // commit('SET_AVATAR', result.avatar)
          resolve({ result })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
