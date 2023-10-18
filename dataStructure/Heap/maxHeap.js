// NOTE: 数组实现大顶堆
class MaxHeap {
  #maxHeap = []

  /* 建堆操作方式1：时间复杂度为 O(n) */
  constructor(nums) {
    this.#maxHeap = nums === undefined ? [] : [...nums]
    for (let i = this.#parent(this.size() - 1); i >= 0; --i) {
      this.#siftDown(i)
    }
  }

  size() {
    return this.#maxHeap.length
  }

  isEmpty() {
    return this.#maxHeap.length === 0
  }

  print() {
    return this.#maxHeap
  }

  /* 获取左子节点索引 */
  #left(i) {
    return 2 * i + 1
  }

  /* 获取右子节点索引 */
  #right(i) {
    return 2 * i + 2
  }

  /* 获取父节点索引 */
  #parent(i) {
    return Math.floor((i - 1) / 2) // 向下整除
  }

  /* 交换节点 */
  #swap(i, j) {
    const tmp = this.#maxHeap[i]
    this.#maxHeap[i] = this.#maxHeap[j]
    this.#maxHeap[j] = tmp
  }

  /* 从下标为 i 的节点向上至根节点完成堆化 Heapify */
  #siftUp(i) {
    while (true) {
      const p = this.#parent(i)
      if (p < 0 || this.#maxHeap[p] >= this.#maxHeap[i]) break
      this.#swap(i, p)
      i = p
    }
  }

  /* 从下标为 i 的节点向下执行堆化 */
  #siftDown(i) {
    let max, l, r
    while (true) {
      l = this.#left(i)
      r = this.#right(i)

      max = i
      if (l < this.size() && this.#maxHeap[l] >= this.#maxHeap[max]) max = l
      if (r < this.size() && this.#maxHeap[r] >= this.#maxHeap[max]) max = r

      // 下标 i 对应节点值最大 or l 或 r 越界
      if (max === i) break

      this.#swap(i, max)
      // 继续向下执行堆化
      i = max
    }
  }

  /* 访问堆顶元素 */
  peek() {
    return this.#maxHeap[0]
  }

  /* 元素入堆 O(logn) */
  push(val) {
    this.#maxHeap.push(val)
    this.#siftUp(this.size() - 1)
  }

  /* 堆顶元素出堆 O(logn) */
  pop() {
    // 判空
    if (this.isEmpty()) {
      throw new Error("堆为空")
    }
    this.#swap(0, this.size() - 1) // 交换堆顶与最底层最右边叶节点
    const val = this.#maxHeap.pop() // 将堆顶元素从堆中删除 O(1)
    this.#siftDown(0) // 从堆顶至底执行堆化
    return val
  }
}

module.exports = MaxHeap

/* 建堆操作方式2：时间复杂度为 O(nlogn) */
// const h = new Heap()
// h.push(9)
// h.push(8)
// h.push(6)
// h.push(6)
// h.push(7)
// h.push(5)
// h.push(2)
// h.push(1)
// h.push(4)
// h.push(3)
// h.push(6)
// h.push(2)
// console.log(h.print())
// h.push(7)
// console.log(h.print())

// const h1 = new MaxHeap([9, 8, 6, 6, 7, 5, 2, 1, 4, 3, 6, 2])
// console.log(h1.print())
