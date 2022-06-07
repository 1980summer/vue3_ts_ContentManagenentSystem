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
  /**
   * 1、在class里的construct构造函数，只要new出来=一个实例，就会被执行
   * 所以可以通过将基本的配置写在构造函数里，所有的实例就都拥有并自动这个配置
   * 可以用来配置baseURL、timeout这些公用的基础配置
   * 2、config的类型也是第三方库的类型，即axios中的AxiosRequestConfig,里面
   * 包含了url、baseURL、timeout、data等等字段
   */
  constructor(config: YXRequestConfig) {
    // axios里的create方法可以创建出来一个axios实例
    this.instance = axios.create(config)
    this.showLoading = config.showLoding ?? DEFAULT_LOADING // 意思是有值吗？没有就给一个true
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
  request(config: YXRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    if (config.showLoding === false) {
      this.showLoading = config.showLoding
    }

    this.instance
      .request(config)
      .then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        console.log(res)

        // 将showLoading设置为true，这样不会影响下一个请求，不然会一直使用上一个请求的配置
        this.showLoading = DEFAULT_LOADING
      })
      .catch((err) => {
        // 将showLoading设置为true，这样不会影响下一个请求，不然会一直使用上一个请求的配置
        this.showLoading = DEFAULT_LOADING
        return err
      })
  }
}

export default YXRequest
