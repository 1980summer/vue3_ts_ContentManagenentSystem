import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' // 加上一个 type 表示这次导入的是一个类型
import LocalCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

//  要求传入routes里的是一个RouteRecordRaw类型， 这是由源码规定的

//  映射关系， 是一个数组
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 路由守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getItem('token')
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
