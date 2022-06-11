import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'
import { getPageListData } from '@/servive/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'summer',
      age: 18,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
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

      // 2 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  modules: {
    loginModule,
    systemModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin') // 对store里的数据做初始化
  store.dispatch('getInitialDataAction') // 调用
}

// 导出一个自己的useStore
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
