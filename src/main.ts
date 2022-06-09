import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'
import { globalRegister } from '@/global'

import 'element-plus/theme-chalk/el-loading.css' // 引入对应样式，ELLoding才能生效

const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore() // 只要项目跑起来就会调用这个方法
app.use(router)

app.mount('#app')
