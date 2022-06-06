/**
 * NOTE: 实现链表数据结构
 */
function LinkedList(isEqualsFn) {
  this.length = 0
  this.head = undefined
  // 用于比较两个节点是否相等
  this.isEqualsFn =
    isEqualsFn ||
    ((a, b) => {
      return a == b
    })
}
function Node(elem) {
  this.elem = elem
  this.next = null
}
// 向链表尾部添加一个新的项
LinkedList.prototype.append = function (elem) {
  const node = new Node(elem)
  let current
  if (!this.head) {
    this.head = node
  } else {
    current = this.head
    while (current.next) {
      current = current.next
    }
    current.next = node
  }
  this.length++ // 更新链表长度值
}
// 向链表指定位置插入一个新的项
LinkedList.prototype.insert = function (elem, idx) {
  if (idx < 0 || idx > this.length) return false
  const current = new Node(elem)
  if (idx === 0) {
    current.next = this.head
    this.head = current
  } else {
    const prev = this.getElemAt(idx - 1)
    current.next = prev.next
    prev.next = current
  }
  this.length++
  return true
}
// 从链表指定位置删除一项。返回被删除项的 elem 值
LinkedList.prototype.removeAt = function (idx) {
  if (idx < 0 || idx > this.length || !this.length) return
  let current = this.head
  if (idx === 0) {
    // 移除第一项
    this.head = current.next
  } else {
    // 移除第一项之后的
    let prev = this.getElemAt(idx - 1)
    current = prev.next
    prev.next = current.next
  }
  this.length--
  return current.elem
}
// 从链表删除一项
LinkedList.prototype.remove = function (elem) {
  const idx = this.indexOf(elem)
  return this.removeAt(idx)
}
// 返回指定项在链表中的索引，如果没有该元素，则返回 -1
LinkedList.prototype.indexOf = function (elem) {
  let idx = 0,
    current = this.head
  while (idx < this.length) {
    if (this.isEqualsFn(current.elem, elem)) {
      break
    } else {
      current = current.next
      idx++
    }
  }
  return idx >= this.length ? -1 : idx
}
// 检测链表是否有值（如果链表中不包含任何元素，则返回 true；如果链表长度大于 0 则返回 false）
LinkedList.prototype.isEmpty = function () {
  return this.length === 0
}
// 返回链表包含的元素的个数
LinkedList.prototype.size = function () {
  return this.length
}
// 返回链表的头结点元素
LinkedList.prototype.getHead = function () {
  return this.head
}
// NOTE: 由于链表的项使用了 Node 类，故需要重写继承自对象的 toString 方法，使其只输出元素的值
LinkedList.prototype.toString = function () {
  if (!this.head) return ""
  let current = this.head,
    objStr = ""
  while (current.next) {
    objStr += current.elem + ","
    current = current.next
  }
  objStr += current.elem
  return objStr
}
// 循环迭代到 idx 指定下标位置
// idx 为 length 时会返回 null
LinkedList.prototype.getElemAt = function (idx) {
  // 检查溢出
  if (idx < 0 || idx > this.length) return
  let current = this.head

  while (idx && !!current) {
    current = current.next
    idx--
  }
  return current
}

const l1 = new LinkedList()
l1.append(3)
l1.append(1)
l1.append(5)
// l1.append(2)
// console.log(l1.removeAt(1))
// console.log(l1.insert(7, 0))
// console.log(l1.insert(9, l1.size()))
// console.log(l1.toString())

exports.LinkedList = LinkedList
exports.Node = Node
