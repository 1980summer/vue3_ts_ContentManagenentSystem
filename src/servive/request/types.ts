import { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface YXRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: any) => any
  responseInterceptorCatch?: (error: any) => any
}

export interface YXRequestConfig extends AxiosRequestConfig {
  interceptors?: YXRequestInterceptors
  showLoding?: boolean
}
