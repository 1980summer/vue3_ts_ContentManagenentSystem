import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'

import 'element-plus/theme-chalk/el-loading.css' // 引入对应样式，ELLoding才能生效

const app = createApp(App)

app.use(store as any)
app.use(router as any)

setupStore()
app.mount('#app')

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// yxRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET'
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
