import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import yxRequest from './servive'

const app = createApp(App)

app.use(store)
app.use(router)
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
  }
})
