// service 统一出口

import YXRequest from './request'

import { BASE_URL, TIME_OUT } from './request/config'

const yxRequest = new YXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default yxRequest
