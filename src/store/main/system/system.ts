import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import { getPageListData } from '@/servive/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1 获取对应pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 2 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // 3 将数据存储到state中
      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      // 首字母大写
      const upperPageName = (pageName.slice(0, 1) as string).toUpperCase() + pageName.slice(1)

      commit(`change${upperPageName}List`, list)
      commit(`change${upperPageName}Count`, totalCount)
    }
  }
}

export default systemModule
//
