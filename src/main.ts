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

setupStore() // 只要项目跑起来就会调用这个方法
app.mount('#app')
