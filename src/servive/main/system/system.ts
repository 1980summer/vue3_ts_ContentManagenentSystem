import yxRequest from '@/servive'
import { IDatatype } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return yxRequest.post<IDatatype>({
    url: url,
    data: queryInfo
  })
}
//
