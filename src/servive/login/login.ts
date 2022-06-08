import yxRequest from '..'
import { IAccount, IDatatype, IloginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login'
}
export function accountLoginRequest(account: IAccount) {
  return yxRequest.post<IDatatype<IloginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
