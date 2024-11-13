const { LinkedList, Node } = require("./LinkedList")
const inheritPrototype = require("../工具函数/inheritPrototype")

function DoubleLinkedList(isEqualsFn) {
  LinkedList.call(this, isEqualsFn)
  this.tail = null // 保存链表尾部的引用
}
function DoubleNode(elem) {
  Node.call(this, elem)
  this.prev = null // 指向上一个节点
}
inheritPrototype(LinkedList, DoubleLinkedList)
inheritPrototype(Node, DoubleNode)
// console.log(DoubleLinkedList.prototype.__proto__ === LinkedList.prototype)
DoubleLinkedList.prototype.append = function (elem) {
  const node = new DoubleNode(elem)
  if (!this.length) {
    this.head = this.tail = node
  } else {
    this.tail.next = node
    node.prev = this.tail
    this.tail = node
  }
  this.length++
}
DoubleLinkedList.prototype.insert = function (elem, idx) {
  const node = new DoubleNode(elem)
  const len = this.length
  if (idx < 0 || idx > len) return false
  if (idx === 0) {
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      node.next = this.head
      this.head.prev = node
      this.head = node
    }
  } else if (idx === len) {
    node.prev = this.tail
    this.tail.next = node
    this.tail = node
  } else {
    const prevNode = this.getElemAt(idx - 1)
    node.next = prevNode.next
    prevNode.next.prev = node
    prevNode.next = node
    node.prev = prev
  }
  this.length++
  return true
}
DoubleLinkedList.prototype.removeAt = function (idx) {
  const len = this.length
  if (idx < 0 || idx > len - 1 || !len) return
  let current
  if (idx === 0) {
    current = this.head
    this.head = this.head.next
    this.head.prev = null
  } else if (idx === len - 1) {
    current = this.tail
    this.tail = this.tail.prev
    this.tail.next = null
  } else {
    current = this.getElemAt(idx)
    current.next.prev = current.prev
    current.prev.next = current.next
  }
  this.length--
  return current.elem
}
DoubleLinkedList.prototype.getTail = function () {
  return this.tail
}
DoubleLinkedList.prototype.getElemAt = function (idx) {
  const len = this.length
  const isBackOrder = idx > len / 2
  let current
  if (isBackOrder) {
    current = this.tail
    idx = len - 1 - idx
    while (idx) {
      current = current.prev
      idx--
    }
  } else {
    current = this.head
    while (idx) {
      current = current.next
      idx--
    }
  }
  return current
}

// 使用示例
const dl = new DoubleLinkedList()
dl.append(3)
dl.append(2)
dl.append(7)
dl.removeAt(1)
// dl.append(9)
// dl.append(5)
// dl.append(4)
// dl.insert(6, 3)
// dl.insert(1, 3)
// console.log(dl.insert(7, 0))
// console.log(dl.insert(9, dl.size()))
console.log(dl.toString(), dl.size())
// console.log(dl.removeAt(4))
// console.log(dl.toString())
