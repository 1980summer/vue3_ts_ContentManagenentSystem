import yxRequest from '@/servive'
import { IDatatype } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return yxRequest.post<IDatatype>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return yxRequest.delete<IDatatype>({
    url: url
  })
}

// 新建一条数据的请求函数
export function createPageData(url: string, newData: any) {
  return yxRequest.post<IDatatype>({
    url: url,
    data: newData
  })
}

// 编辑一条数据的请求函数, 是一个patch请求
export function editPageData(url: string, editData: any) {
  return yxRequest.patch<IDatatype>({
    url: url,
    data: editData
  })
}
//
