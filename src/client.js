import { createPinia } from 'pinia'

// 创建 Pinia 实例
const pinia = createPinia()

export function initApp() {
  return pinia
}
