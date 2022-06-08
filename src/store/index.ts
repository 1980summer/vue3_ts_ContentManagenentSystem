import { createStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'
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
    login
  }
})

// 对store里的数据做初始化
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export default store
