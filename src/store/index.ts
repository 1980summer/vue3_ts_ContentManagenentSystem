import { createStore } from 'vuex'
import { IRootState } from './types'
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
export default store
