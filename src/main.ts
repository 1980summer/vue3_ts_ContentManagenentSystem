import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'normalize.css'
import './assets/css/index.less'

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
