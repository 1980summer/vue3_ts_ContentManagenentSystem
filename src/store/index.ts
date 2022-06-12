import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'

import loginModule from './login/login'
import systemModule from './main/system/system'
import dashboardModule from './main/analysis/dashboard'

import { getPageListData } from '@/servive/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'summer',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1 请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000 // 数量
      })
      const { list: departmentList } = departmentResult.data // 解构之后起别名，list: departmentList意思是起别名，es6语法
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000 // 数量
      })
      const { list: roleList } = roleResult.data

      // 请求菜单数据
      const menuResult = await getPageListData('menu/list', {})
      const { list: menuList } = menuResult.data

      // console.log(departmentList)
      // console.log(roleList)

      // 2 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    systemModule,
    dashboardModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin') // 对store里的数据做初始化
  // store.dispatch('getInitialDataAction') // 调用 (最好不要在此处调用，万一没拿到token就会出bug)
}

// 导出一个自己的useStore
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
