/* NOTE: 哈希表的简易实现 */

// 键值对类
class Pair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
}

class ArrayHashMap {
  #capacity
  #buckets
  constructor(capacity = 100) {
    this.#capacity = capacity
    this.#buckets = new Array(capacity).fill(null)
  }

  // hash 函数
  #hashFn(key) {
    return key % this.#capacity
  }

  /** 增删查改 */
  get(key) {
    let idx = this.#hashFn(key)
    let item = this.#buckets[idx]
    return item?.value || null
  }

  set(key, value) {
    let idx = this.#hashFn(key)
    this.#buckets[idx] = new Pair(key, value)
  }

  delete(key) {
    let idx = this.#hashFn(key)
    this.#buckets[idx] = null
  }

  /** 遍历方法 */
  entries() {
    let arr = []
    for (let b of this.#buckets) {
      if (!!b) {
        arr.push([b.key, b.value])
      }
    }
    return arr
  }
  keys() {
    let arr = []
    for (let b of this.#buckets) {
      if (!!b) {
        arr.push(b.key)
      }
    }
    return arr
  }
  values() {
    let arr = []
    for (let b of this.#buckets) {
      if (!!b) {
        arr.push(b.value)
      }
    }
    return arr
  }
}

const ahm = new ArrayHashMap(10)
ahm.set(312, "312")
ahm.set(947, "947")
ahm.set(711, "711")
console.log(ahm.get(312))
console.log(ahm.get(313))
for (let [key, value] of ahm.entries()) {
  console.log("==> entries", key, value)
}
for (let key of ahm.keys()) {
  console.log("==> keys", key)
}
for (let value of ahm.values()) {
  console.log("==> values", value)
}
