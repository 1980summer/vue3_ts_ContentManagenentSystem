import { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface YXRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface YXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YXRequestInterceptors<T>
  showLoding?: boolean
}
