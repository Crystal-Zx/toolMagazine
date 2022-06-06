const { LinkedList, Node } = require("./LinkedList")
const inheritPrototype = require("../工具函数/inheritPrototype")

function CircleLinkedList(isEqualsFn) {
  LinkedList.call(this, isEqualsFn)
}
inheritPrototype(LinkedList, CircleLinkedList)

CircleLinkedList.prototype.insert = function (elem, idx) {
  const len = this.length
  if (idx < 0 || idx > len) return false
  const node = new Node(elem)
  if (idx === 0) {
    if (!this.head) {
      this.head = node
      this.head.next = this.head
    } else {
      const tail = this.getElemAt(len - 1)
      node.next = this.head
      this.head = node
      tail.next = this.head
    }
  } else {
    const prev = this.getElemAt(idx - 1)
    node.next = prev.next
    prev.next = node
  }
  this.length++
  return true
}
CircleLinkedList.prototype.removeAt = function (idx) {
  const len = this.length
  if (idx < 0 || idx > len - 1 || !len) return
  // idx 的有效值范围为： idx ∈ [0, len - 1]
  let current
  if (idx === 0) {
    current = this.head
    if (len === 1) {
      this.head = undefined
    } else {
      this.head = this.head.next
      const tail = this.getElemAt(len - 1)
      tail.next = this.head
      console.log("==> tail", len, tail)
    }
  } else {
    prevNode = this.getElemAt(idx - 1)
    current = prevNode.next
    prevNode.next = prevNode.next.next
  }
  this.length--
  return current.elem
}
const cl = new CircleLinkedList()
cl.insert(7, 0)
cl.insert(1, 0)
cl.insert(4, cl.size())
console.log(cl.removeAt(0))
console.log(cl.getElemAt(0).next.next)
// console.log(cl.getElemAt(1))
// console.log(cl.getElemAt(2))
// console.log(cl.getElemAt(3))
// console.log(cl.getElemAt(4))
