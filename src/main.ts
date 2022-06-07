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

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

// yxRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoding: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

yxRequest
  .get<DataType>({
    url: '/home/multidata',
    showLoding: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

// yxRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   },
//   showLoding: false
// })
