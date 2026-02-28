// NOTE: 堆结构统一写法：通过 compareFn 区分大小顶堆
class Heap {
  #heap
  #compareFn
  constructor(compareFn = () => {}) {
    this.#heap = []
    this.#compareFn = compareFn
  }

  #parent(i) {
    return Math.floor((i - 1) / 2)
  }
  #left(i) {
    return 2 * i + 1
  }
  #right(i) {
    return 2 * i + 2
  }
  #swap(i, j) {
    ;[this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]]
  }
  // 从 i 向上完成堆化
  #siftUp(i) {
    while (true) {
      const pi = this.#parent(i)
      if (pi < 0 || this.#compareFn(this.#heap[pi], this.#heap[i]) <= 0) break

      this.#swap(i, pi)
      i = pi
    }
  }
  // 从 i 向下完成堆化
  #siftDown(i) {
    let min = i
    let l, r
    while (true) {
      l = this.#left(i)
      r = this.#right(i)
      if (
        l < this.size() &&
        this.#compareFn(this.#heap[min], this.#heap[l]) > 0
      )
        min = l
      if (
        r < this.size() &&
        this.#compareFn(this.#heap[min], this.#heap[r]) > 0
      )
        min = r

      if (min === i) break

      this.#swap(i, min)
      i = min
    }
  }

  push(val) {
    this.#heap.push(val)
    this.#siftUp(this.size() - 1)
  }
  pop() {
    if (!this.size()) throw new Error('栈为空')

    this.#swap(0, this.size() - 1)
    const val = this.#heap.pop()
    this.#siftDown(0)
    return val
  }
  peak() {
    return this.#heap[0]
  }
  size() {
    return this.#heap.length
  }
  print() {
    console.log('🚀 ~ minHeap:', this.#heap)
  }
}

const minHeap = new Heap((a, b) => a - b)
minHeap.push(2)
minHeap.push(4)
minHeap.push(7)
minHeap.push(1)
minHeap.push(9)

minHeap.print()
