const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  outputDir: './build',

  configureWebpack: {
    // resolve 用于配置路径
    resolve: {
      alias: {
        components: '@/component'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  // 解决跨域
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:4000', //映射到这个地址
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
