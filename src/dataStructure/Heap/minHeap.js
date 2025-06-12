// NOTE: 数组实现小顶堆
class MinHeap {
  #minHeap = []

  constructor(nums) {
    this.#minHeap = nums === undefined ? [] : [...nums]
    for (let i = this.#parent(this.size() - 1); i >= 0; --i) {
      this.#siftDown(i)
    }
  }

  size() {
    return this.#minHeap.length
  }

  isEmpty() {
    return this.#minHeap.length === 0
  }

  print() {
    return this.#minHeap
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
    const tmp = this.#minHeap[i]
    this.#minHeap[i] = this.#minHeap[j]
    this.#minHeap[j] = tmp
  }

  /* 从下标为 i 的节点向上至根节点完成堆化 Heapify */
  #siftUp(i) {
    while (true) {
      const p = this.#parent(i)
      if (p < 0 || this.#minHeap[p] <= this.#minHeap[i]) break
      this.#swap(i, p)
      i = p
    }
  }

  /* 从下标为 i 的节点向下执行堆化 */
  #siftDown(i) {
    let min = i,
      l,
      r
    while (true) {
      l = this.#left(i)
      r = this.#right(i)

      // max = i
      if (l < this.size() && this.#minHeap[l] <= this.#minHeap[min]) min = l
      if (r < this.size() && this.#minHeap[r] <= this.#minHeap[min]) min = r

      // 下标 i 对应节点值最大 or l 或 r 越界
      if (min === i) break

      this.#swap(i, min)
      // 继续向下执行堆化
      i = min
    }
  }

  /* 访问堆顶元素 */
  peek() {
    return this.#minHeap[0]
  }

  /* 元素入堆 O(logn) */
  push(val) {
    this.#minHeap.push(val)
    this.#siftUp(this.size() - 1)
  }

  /* 堆顶元素出堆 O(logn) */
  pop() {
    // 判空
    if (this.isEmpty()) {
      throw new Error('堆为空')
    }
    this.#swap(0, this.size() - 1) // 交换堆顶与最底层最右边叶节点
    const val = this.#minHeap.pop() // 将堆顶元素从堆中删除 O(1)
    this.#siftDown(0) // 从堆顶至底执行堆化
    return val
  }
}
module.exports = MinHeap

class MinHeap1 {
  #minHeap = []
  constructor(nums) {
    this.#minHeap = nums === undefined ? [] : [...nums]
    for (let i = this.#parent(this.size() - 1); i >= 0; i--) {
      this.#shiftDown(i)
    }
  }

  size() {
    return this.#minHeap.length
  }

  isEmpty() {
    return this.size() === 0
  }

  peak() {
    return this.#minHeap[0]
  }
  push(val) {
    this.#minHeap.push(val)
    this.#siftUp(this.size() - 1)
  }
  pop() {
    if (this.isEmpty()) return
    this.#swap(0, this.size() - 1)
    const value = this.#minHeap.pop()
    this.#shiftDown(0)
    return value
  }

  print() {
    return this.#minHeap.toString()
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
    const tmp = this.#minHeap[j]
    this.#minHeap[j] = this.#minHeap[i]
    this.#minHeap[i] = tmp
  }

  #siftUp(i) {
    while (true) {
      let p = this.#parent(i)
      if (p < 0 || this.#minHeap[p] <= this.#minHeap[i]) break

      this.#swap(p, i)
      i = p
    }
  }

  #shiftDown(i) {
    let l,
      r,
      min = i
    while (true) {
      l = this.#left(i)
      r = this.#right(i)

      if (l < this.size() && this.#minHeap[l] < this.#minHeap[min]) min = l
      if (r < this.size() && this.#minHeap[r] < this.#minHeap[min]) min = r

      if (i === min) break

      this.#swap(i, min)
      i = min
    }

    // const left = this.left(i)
    // const right = this.right(i)
    // if (this.#minHeap[left] < this.#minHeap[i]) {
    //   this.#swap(left, i)
    // }
    // if (this.#minHeap[right] < this.#minHeap[i]) {
    //   this.#swap(right, i)
    // }
  }
}

const minh = new MinHeap1([3, 54, 2, 1, 6, 4])
console.log('🚀 ~ minh:', minh.print())
