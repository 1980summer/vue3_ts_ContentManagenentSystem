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
//
