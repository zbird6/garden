/**
 * 本地存储工具
 */

export const Storage = {
  /**
   * 获取存储的值
   */
  get<T = any>(key: string, defaultValue: T | null = null): T | null {
    try {
      const value = localStorage.getItem(key)
      return value ? (JSON.parse(value) as T) : defaultValue
    } catch (error) {
      console.error(`获取存储数据失败: ${key}`, error)
      return defaultValue
    }
  },

  /**
   * 设置存储的值
   */
  set<T = any>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`存储数据失败: ${key}`, error)
      return false
    }
  },

  /**
   * 删除存储的值
   */
  remove(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`删除存储数据失败: ${key}`, error)
      return false
    }
  },

  /**
   * 清空所有存储
   */
  clear(): boolean {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('清空存储数据失败', error)
      return false
    }
  },
}
