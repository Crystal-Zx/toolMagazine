// NOTE: 集合
class Set {
  constructor() {
    this.items = {}
  }
  // 向集合添加一个元素
  add(item) {
    if (this.has(item)) return false
    this.items[item] = item
    return true
  }
  // 从集合删除一个元素
  delete(item) {
    if (!this.has(item)) return false
    delete this.items[item]
    return true
  }
  // 判断集合是否包含一个元素
  has(item) {
    return Object.prototype.hasOwnProperty.call(this.items, item)
  }
  // 删除集合里面全部元素
  clear() {
    this.items = {}
  }
  // 获取集合的元素个数
  size() {
    return Object.keys(this.items).length
  }
  // 返回集合的所有元素
  values() {
    // return Object.values(this.items)
    let values = []
    for (let key in this.items) {
      if (this.has(key)) {
        values.push(this.items[key])
      }
    }
    return values
  }
  // NOTE: 集合的操作
  // -- 并集
  union(otherSet) {
    let unionSet = new Set()
    this.values().forEach(item => unionSet.add(item))
    otherSet.values().forEach(item => unionSet.add(item))
    return unionSet
  }
  // -- 交集
  intersection(otherSet) {
    const mapSet = this.size() > otherSet.size() ? otherSet : this // 减少遍历次数
    const intersectionSet = new Set()
    mapSet.values().forEach(item => {
      if (otherSet.has(item)) {
        intersectionSet.add(item)
      }
    })
    return intersectionSet
  }
  // - 差集（存在于 this 指向的集合而不存在与 otherSet）
  difference(otherSet) {
    const diffSet = new Set()
    this.values().forEach(item => {
      if (!otherSet.has(item)) {
        diffSet.add(item)
      }
    })
    return diffSet
  }
  // -- 验证子集
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) return false
    let isSub = true
    this.values().every(item => {
      if (!otherSet.has(item)) {
        isSub = false
        return false
      }
      return true
    })
    return isSub
  }
}
const setA = new Set()
setA.add(1)
setA.add(2)
const setB = new Set()
setB.add(1)
setB.add(2)
setB.add(3)
const setC = new Set()
setC.add(2)
setC.add(3)
setC.add(4)
console.log(setA.isSubsetOf(setB))
console.log(setA.isSubsetOf(setC))
