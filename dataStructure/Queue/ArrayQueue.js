// NOTE: 基于「循环数组」实现的「队列」

// （循环列表可以解决 pop 出队时间复杂度为 O(N) 的问题，很棒！！！）
// 不需要额外在声明一个 tail 指向队尾，可以通过 front + size 求得
class ArrayQueue {
  #front
  #queue
  #queueSize = 0

  // 本例使用的循环数组长度是固定的，可使用扩容方式来生成动态数组来实现队列
  constructor(capacity) {
    this.#queue = new Array(capacity)
  }

  // 获取队列容量
  get capacity() {
    return this.#queue.length
  }

  // 获取队列长度
  get size() {
    return this.#queueSize
  }

  isEmpty() {
    return this.#queueSize === 0
  }

  // 入队
  push(val) {
    // 队列已满
    if (this.size === this.capacity) return new Error("队列已满")

    // 计算循环指针下标
    const rear = (this.#front + this.size) % this.capacity
    this.#queue[rear] = val
    this.#queueSize++
  }

  // 出队
  pop() {
    const num = this.peak()
    // 需要考虑 front 越界的情况
    this.#front = (this.#front + 1) % this.capacity
    // this.#queue[this.#front] = undefined  // 不需要特意处理，后续会被自动覆盖
    this.#queueSize--
    return num
  }

  // 访问队首元素
  peak() {
    if (this.isEmpty()) return new Error("队列为空")
    return this.#queue[this.#front]
  }
}
