//  通过process.env.NODE_ENV来判断是哪个环境
// 在开发环境下，process.env.NODE_ENV的值就是 development
// 在生产环境下，process.env.NODE_ENV的值就是 production
// 在测试环境下，process.env.NODE_ENV的值就是 test

let BASE_URL = ''
let TIME_OUT = 15000

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://152.136.185.210:5000'
  BASE_URL = 'http://123.207.32.32:8000'
  TIME_OUT = 15000
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coder.org/pro'
  TIME_OUT = 20000
} else {
  BASE_URL = 'http://coder.org/test'
  TIME_OUT = 10000
}

// es module语法， 看起来像一个对象但不是对象
export { BASE_URL, TIME_OUT }
