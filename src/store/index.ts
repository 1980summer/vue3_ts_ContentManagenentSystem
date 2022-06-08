import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginModule from './login/login'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'summer',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    loginModule
  }
})

// 对store里的数据做初始化
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

// 导出一个自己的useStore
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
