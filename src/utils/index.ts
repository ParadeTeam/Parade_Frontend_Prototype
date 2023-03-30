import { isObject } from '@vueuse/core'

// 深度 Copy 確保不參考到同一個記憶體
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target)
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])

  return src
}


// 作者: Lonka Liu
// 連結: https://lonka.github.io/blog/2022/07/04/vue3-append-axios-in-vue3/
// 來源: Lonka's Blog
// 著作權歸作者所有。商業轉載請聯絡作者獲得授權，非商業轉載請註明出處。