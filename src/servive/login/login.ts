import yxRequest from '..'
import { IAccount, IDatatype, IloginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法： /users/1
  UserMenus = '/role/' // 用法： role/1/menu
}
export function accountLoginRequest(account: IAccount) {
  return yxRequest.post<IDatatype<IloginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return yxRequest.get<IDatatype>({
    url: LoginAPI.LoginUserInfo + id,
    showLoding: false
  })
}

export function requestUserMenusByRole(id: number) {
  return yxRequest.get<IDatatype>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoding: false
  })
}

//
