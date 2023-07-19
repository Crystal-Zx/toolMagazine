// NOTE: 基于「循环数组」实现的「队列」
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

  getIndex(idx) {
    return (idx + this.capacity) % this.capacity
  }

  // 入队队首
  pushFirst(val) {
    // 队列已满
    if (this.size === this.capacity) return new Error("队列已满")

    this.#front = this.getIndex(this.#front - 1) // 通过取余，使得越过队首的回到队尾
    this.#queue[this.#front] = val
    this.#queueSize++
  }

  // 入队队尾
  pushLast(val) {
    // 队列已满
    if (this.size === this.capacity) return new Error("队列已满")

    // 计算循环指针下标
    const rear = (this.#front + this.size) % this.capacity
    this.#queue[rear] = val
    this.#queueSize++
  }

  // 队首出队
  popFirst() {
    const num = this.peakFirst()
    // 需要考虑 front 越界的情况
    this.#front = (this.#front + 1) % this.capacity
    // this.#queue[this.#front] = undefined  // 不需要特意处理，后续会被自动覆盖
    this.#queueSize--
    return num
  }

  // 队尾出队
  popLast() {
    const num = this.peakLast()
    this.#queueSize--
    return num
  }

  // 访问队首元素
  peakFirst() {
    if (this.isEmpty()) return new Error("队列为空")
    return this.#queue[this.#front]
  }

  // 访问队尾元素
  peakLast() {
    if (this.isEmpty()) return new Error("队列为空")
    const tail = this.getIndex(this.#front + this.size - 1)
    return this.#queue[tail]
  }
}

// NOTE: 关于双向队列的应用：

// 双向队列兼具栈与队列的逻辑，因此它可以实现这两者的所有应用场景，同时提供更高的自由度。

// 我们知道，软件的“撤销”功能通常使用栈来实现：系统将每次更改操作 push 到栈中，然后通过 pop 实现撤销。然而，考虑到系统资源的限制，软件通常会限制撤销的步数（例如仅允许保存步）。当栈的长度超过时，软件需要在栈底（即队首）执行删除操作。但栈无法实现该功能，此时就需要使用双向队列来替代栈。请注意，“撤销”的核心逻辑仍然遵循栈的先入后出原则，只是双向队列能够更加灵活地实现一些额外逻辑。

// —— https://www.hello-algo.com/chapter_stack_and_queue/deque/#_2
