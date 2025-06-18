/**
 * LRU（Least Recently Used）
 * 是一种缓存淘汰策略，它会优先删除最近最少使用的数据。下面提供两种实现方式：使用 Map 的简单实现和不使用 Map 的基础实现。
 */
class LRUCache {
  #size
  #cacheMap
  constructor(size = 5) {
    this.#size = size
    this.#cacheMap = new Map()
  }
  get = key => {
    if (!this.#cacheMap.has(key)) return
    const { value, times } = this.#cacheMap.get(key)
    this.#cacheMap.set(key, { value, times: times + 1 })
    return this.#cacheMap.get(key).value
  }
  put = (key, value) => {
    if (this.#cacheMap.size >= this.#size) {
      // 需先清空最近使用次数最少的值
      let minKey,
        minTimes = Infinity
      this.#cacheMap.entries().forEach(([key, { value, times }]) => {
        if (times < minTimes) {
          minTimes = times
          minKey = key
        }
      })
      this.#cacheMap.delete(minKey)
    }
    this.#cacheMap.set(key, { value, times: 0 })
  }
}

// TEST:
const lc = new LRUCache(3)
console.log(lc.get('a')) // undefined
lc.put('a', 'a')
lc.put('b', 'b')
lc.put('c', 'c')
console.log(lc.get('a')) // 'a'
console.log(lc.get('c')) // 'c
lc.put('d', 'd') // 此时 lc 达到最大容量，访问次数最小的 b 被删除
console.log(lc.get('b')) // undefined
