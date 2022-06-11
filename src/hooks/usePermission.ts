import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  // 转成布尔类型，两种写法
  // return Boolean(permissions.find(item => item === verifyPermission))
  return !!permissions.find((item) => item === verifyPermission)
}
//
