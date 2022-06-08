import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { accountLoginRequest } from '@/servive/login/login'
import { IAccount } from '@/servive/login/types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    }
  },
  getters: {},
  actions: {
    // 1 实现登录逻辑
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      // console.log(loginResult.data)
      const { id, token } = loginResult.data
      commit('changeToken', token)

      // 2
    }
    // phoneLoginAction({ commit }, payload) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default loginModule
