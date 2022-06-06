//  通过process.env.NODE_ENV来判断是哪个环境
// 在开发环境下，process.env.NODE_ENV的值就是 development
// 在生产环境下，process.env.NODE_ENV的值就是 production
// 在测试环境下，process.env.NODE_ENV的值就是 test

let BASE_URL = ''
let BASE_NAME = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://coder.org/dev'
  BASE_NAME = 'summer'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coder.org/pro'
  BASE_NAME = 'winter'
} else {
  BASE_URL = 'http://coder.org/test'
  BASE_NAME = 'spring'
}

// es module语法， 看起来像一个对象但不是对象
export { BASE_URL, BASE_NAME }
