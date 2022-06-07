import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import yxRequest from './servive'

import 'element-plus/theme-chalk/el-loading.css' // 引入对应样式，ELLoding才能生效

const app = createApp(App)

app.use(store as any)
app.use(router as any)
app.mount('#app')

yxRequest.request({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config')
      return config
    },
    responseInterceptor: (res) => {
      console.log('单独响应的response')
      return res
    }
  },
  showLoding: false
})
