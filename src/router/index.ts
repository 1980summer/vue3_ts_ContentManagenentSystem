import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' // 加上一个 type 表示这次导入的是一个类型
import LocalCache from '@/utils/cache'

//  要求传入routes里的是一个RouteRecordRaw类型， 这是由源码规定的

//  映射关系， 是一个数组
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

//
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getItem('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
