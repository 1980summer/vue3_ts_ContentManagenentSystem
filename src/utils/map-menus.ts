import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
        if (!firstMenu) {
          firstMenu = menu // 赋第一个找到的值
        }
      } else {
        _recurseGetRoutes(menu.children)
      }
    }
  }
  _recurseGetRoutes(userMenus)

  return routes
}

// 获取面包屑数据
export function pathMapToBreadcrumbs(userMenu: any[], currentPath: string) {
  const breadcrumb: IBreadcrumb[] = []
  pathMapToMenu(userMenu, currentPath, breadcrumb) // 调用下面的函数
  return breadcrumb
}

export function pathMapToMenu(
  userMenu: any[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
// ======================================合并前的代码===========================================
// export function pathMapToBreadcrumbs(userMenu: any[], currentPath: string) {
//   const breadcrumb: IBreadcrumb[] = []
//   for (const menu of userMenu) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumb.push({name: menu.name, path: menu.url})
//         breadcrumb.push({name:findMenu.name, path: findMenu.path})
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
//   return breadcrumb
// }

// export function pathMapToMenu(userMenu: any[], currentPath: string): any {
//   for (const menu of userMenu) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) return findMenu
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

export function mapMenuToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission) // 拿到对应菜单的permission属性
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

// 获取菜单中叶子节点的key
export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leafKeys
}

export { firstMenu }
//
