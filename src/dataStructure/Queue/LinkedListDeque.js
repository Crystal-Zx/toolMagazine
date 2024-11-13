class DequeNode {
  val
  prev
  next

  constructor(val, next, prev) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
    this.prev = prev === undefined ? null : prev
  }
}

// NOTE: 基于「双向链」表实现的「双向队列」
class LinkedListQueue {
  #head
  #tail
  #size

  constructor() {
    this.#head = null
    this.#tail = null
    this.#size = 0
  }

  get size() {
    return this.#size
  }

  isEmpty() {
    return this.#size === 0
  }

  // 向队首入队
  pushFirst(val) {
    const node = new DequeNode(val)
    if (this.isEmpty()) {
      this.#head = this.#tail = node
    } else {
      node.next = this.#head
      this.#head.prev = node
      this.#head = node
    }
    this.#size++
  }

  // 向队尾入队
  pushLast(val) {
    const node = new DequeNode(val)
    if (this.isEmpty()) {
      this.#head = this.#tail = node
    } else {
      this.#tail.next = node
      node.prev = this.#tail
      this.#tail = node
    }
    this.#size++
  }

  // 队首元素出队
  popFirst() {
    if (this.isEmpty) return null
    const val = this.#head.val
    const tmp = this.#head.next // 头节点的下一个节点
    if (!tmp) {
      tmp.prev = null // 释放 tmp 对原头节点的引用
      this.#head.next = null // 释放 tmp 节点的引用
    }
    this.#head = tmp
    this.#size--
    return val
  }

  // 队尾元素出队
  popLast() {
    if (this.isEmpty) return null
    const val = this.#tail.val
    const tmp = this.#tail.prev // 队尾元素的上一个节点
    if (!tmp) {
      tmp.next = null // 释放 tmp 对原头节点的引用
      this.#tail.prev = null // 释放 tmp 节点的引用
    }
    this.#tail = tmp
    this.#size--
    return val
  }

  peekFirst() {
    return !!this.#size ? this.#head.val : null
  }

  peekLast() {
    return !!this.#size ? this.#tail.val : null
  }
}
