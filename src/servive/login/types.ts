export interface IAccount {
  name: string
  password: string
}

export interface IloginResult {
  id: number
  name: string
  token: string
}
export interface IDatatype<T = any> {
  code: number
  data: T
}
