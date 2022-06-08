import { RouteRecordRaw } from 'vue-router'

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1 先去加载默认所有的routes

  const allRoutes: RouteRecordRaw[] = []
  // require.context这个工具可以加载文件夹里的文件，是webpaack内置的，
  // 三个参数： （路径， 是否递归多层文件夹， 何种格式的文件）
  const routesFiles = require.context('../router/main', true, /\.ts/)
  routesFiles.keys().forEach((key) => {
    // 加载某个具体的文件
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  console.log(allRoutes)
  // 2 根据菜单获取需要添加的routes
  return routes
}
//
