class LocalCache {
  // 封装方法们：
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getItem(key: string) {
    // obj -> string -> obj
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteItem(key: string) {
    window.localStorage.removeItem(key)
  }

  // 这个方法会清空，慎调
  clearItem(key: string) {
    window.localStorage.clear()
  }
}

export default new LocalCache()
