import menu from '@/router/main/system/menu/menu'
import { RouteRecordRaw } from 'vue-router'

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1 先去加载默认所有的routes

  const allRoutes: RouteRecordRaw[] = []
  // require.context这个工具可以加载文件夹里的文件，是webpaack内置的，最后会得到一个对象
  // 三个参数： （路径， 是否递归多层文件夹， 何种格式的文件）
  const routesFiles = require.context('../router/main', true, /\.ts/)
  routesFiles.keys().forEach((key) => {
    // 加载某个具体的文件
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // console.log(allRoutes)
  // 2 根据菜单获取需要添加的routes
  // 递归
  const _recurseGetRoutes = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          // finde函数是把符合条件的找出来
          return route.path === menu.url // 条件
        })
        if (route) routes.push(route)
      } else {
        _recurseGetRoutes(menu.children)
      }
    }
  }
  _recurseGetRoutes(userMenus)

  return routes
}
//
