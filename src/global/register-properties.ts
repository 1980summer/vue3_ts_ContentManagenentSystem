import { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

export default function registerProperties(app: App) {
  /**
   *
   * 表示添加了一个$filters属性。
   * app里有config属性，这个属性里有globalProperties属性，在这个属性里加上属性的话可以全局使用
   * $开头表示是全局的，filters表示过滤
   */
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}

//
