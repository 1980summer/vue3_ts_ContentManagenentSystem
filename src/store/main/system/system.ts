import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import { getPageListData } from '@/servive/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userList
            break
          case 'role':
            return state.roleList
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1 获取对应pageUrl
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }

      // 2 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // 3 将数据存储到state中
      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      switch (pageName) {
        case 'user':
          commit('changeUserList', list)
          commit('changeUserCount', totalCount)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
      }
    }
  }
}

export default systemModule
//
