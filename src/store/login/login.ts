import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRole
} from '@/servive/login/login'
import { IAccount } from '@/servive/login/types'
import LocalCache from '@/utils/cache'
import router from '@/router'
import { mapMenuToRoutes, mapMenuToPermissions } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // userMenus 映射到 routes 里面
      // 将routes 添加到 router.main.children 里
      const routes = mapMenuToRoutes(userMenus)
      // console.log(routes)
      routes.forEach((route) => {
        router.addRoute('main', route) // addRoute 是一个方法：把新的路由作为child添加到已存在的路由上
      })

      // 获取用户菜单权限
      const permission = mapMenuToPermissions(userMenus)
      // console.log(permission)
      state.permissions = permission
    }
  },
  getters: {},
  actions: {
    // 1 实现登录逻辑
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      // 拿到token后，在此处发送初始化的请求,
      dispatch('getInitialDataAction', null, { root: true }) // 表示不是调用这个文件的action，而是根里的action

      // 2 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      // console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 3 请求用户菜单
      const userMenusResult = await requestUserMenusByRole(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4 跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getItem('token')
      if (token) {
        commit('changeToken', token)
        // 拿到token后，在此处发送初始化的请求,
        dispatch('getInitialDataAction', null, { root: true }) // 表示不是调用这个文件的action，而是根里的action
      }

      const userInfo = LocalCache.getItem('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = LocalCache.getItem('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
