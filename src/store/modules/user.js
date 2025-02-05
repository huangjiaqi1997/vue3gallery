import {
  register as registerApi,
  login as loginApi,
  getUserInfo as getUserInfoApi,
  updateUserInfo as updateUserInfoApi
} from '@/api/user'
import { Message } from '@/libs'
import router from '@/router'

export default {
  state: () => ({
    userInfo: {},
    token: ''
  }),
  mutations: {
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    setToken: (state, token) => {
      state.token = token
    },
    logout: (state) => {
      state.userInfo = {}
      state.token = ''
      // 刷新页面
      router.push('/').then(() => {
        location.reload()
      })
    }
  },
  actions: {
    login: async ({ commit, dispatch }, params) => {
      const res = await loginApi(params)
      commit('setToken', res.token)
      // 登录后获取用户信息
      await dispatch('getUserInfo')
    },
    register: async ({ dispatch }, params) => {
      await registerApi(params)
      // 注册后调用登录
      await dispatch('login', {
        username: params.username,
        password: params.password,
        loginType: 'username'
      })
    },
    getUserInfo: async ({ commit }) => {
      const res = await getUserInfoApi()
      commit('setUserInfo', res)
      Message({
        type: 'success',
        message: `欢迎您，${res.username}！`
      })
    },
    updateUserInfo: async ({ commit }, userInfo) => {
      const res = await updateUserInfoApi(userInfo)
      commit('setUserInfo', res)
    }
  }
}
