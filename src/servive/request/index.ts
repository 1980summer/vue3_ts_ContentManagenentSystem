import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

// 创建一个类并导出
class YXRequest {
  // 创建一个属性，其类型是axios中的AxiosInstance类型，是第三方库的类型
  instance: AxiosInstance

  /**
   * 1、在class里的construct构造函数，只要new出来=一个实例，就会被执行
   * 所以可以通过将基本的配置写在构造函数里，所有的实例就都拥有并自动这个配置
   * 可以用来配置baseURL、timeout这些公用的基础配置
   * 2、config的类型也是第三方库的类型，即axios中的AxiosRequestConfig,里面
   * 包含了url、baseURL、timeout、data等等字段
   */
  constructor(config: AxiosRequestConfig) {
    // axios里的create方法可以创建出来一个实例
    this.instance = axios.create(config)
  }

  // 封装一个request方法，用来发送请求，以供外界调用
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default YXRequest
