class LinkedNode {
  #val
  #next

  constructor(val, next) {
    this.#val = val === undefined ? 0 : val
    this.#next = next === undefined ? null : next
  }
}

// NOTE: 基于「链表」实现的「队列」
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

  // 入队
  push(val) {
    const node = new Node(val)
    if (!this.#size) {
      // 队列为空
      this.#head = this.#tail = node
    } else {
      this.#tail.next = node
      this.#tail = node
    }
    this.#size++
  }

  // 出队
  pop() {
    const num = this.peak()
    this.#head = this.#head.next
    this.#size--
    return num
  }

  // 访问队首元素
  peak() {
    if (!this.#size) return new Error("队列为空")
    return this.#head.val
  }
}
