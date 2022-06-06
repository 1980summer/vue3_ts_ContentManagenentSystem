import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { YXRequestInterceptors, YXRequestConfig } from './types'

// 创建一个类并导出
class YXRequest {
  // 创建一个属性，其类型是axios中的AxiosInstance类型，是第三方库的类型
  instance: AxiosInstance
  interceptors?: YXRequestInterceptors
  /**
   * 1、在class里的construct构造函数，只要new出来=一个实例，就会被执行
   * 所以可以通过将基本的配置写在构造函数里，所有的实例就都拥有并自动这个配置
   * 可以用来配置baseURL、timeout这些公用的基础配置
   * 2、config的类型也是第三方库的类型，即axios中的AxiosRequestConfig,里面
   * 包含了url、baseURL、timeout、data等等字段
   */
  constructor(config: YXRequestConfig) {
    // axios里的create方法可以创建出来一个实例
    this.instance = axios.create(config)

    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的请求成功的拦截')
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

        return res
      },
      (err) => {
        console.log('所有实例都有的响应失败的拦截')

        return err
      }
    )
  }

  // 封装一个request方法，用来发送请求，以供外界调用
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default YXRequest
