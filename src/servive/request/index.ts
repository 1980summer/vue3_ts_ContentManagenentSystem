import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YXRequestInterceptors, YXRequestConfig } from './types'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

// 创建一个类并导出
class YXRequest {
  // 创建一个属性，其类型是axios中的AxiosInstance类型，是第三方库的类型
  instance: AxiosInstance
  interceptors?: YXRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: YXRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoding ?? DEFAULT_LOADING // 意思是有值吗？没有就给一个true
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1 从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的请求成功的拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            // fullscreen: true,
            // lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, .4)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的请求失败的拦截')

        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的响应成功的拦截')

        // 将lloading移除

        setTimeout(() => {
          this.loading?.close()
        }, 2000)

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，这是错误信息')
        } else {
          return data
        }
        return res.data
      },
      (err) => {
        console.log('所有实例都有的响应失败的拦截')
        if (err.response.status === 404) {
          console.log('404错误!!')
        }
        return err
      }
    )
  }

  // 封装一个request方法，用来发送请求，以供外界调用
  // 单个请求拦截器的封装
  request<T>(config: YXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1 单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2 判断是否要显示loading
      if (config.showLoding === false) {
        this.showLoading = config.showLoding
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          console.log(res)

          // 2 将showLoading设置为true，这样不会影响下一个请求，不然会一直使用上一个请求的配置
          this.showLoading = DEFAULT_LOADING

          // 3 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置为true，这样不会影响下一个请求，不然会一直使用上一个请求的配置
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  // 封装
  get<T>(config: YXRequestConfig<T>): Promise<T> {
    // 调用request
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YXRequest
