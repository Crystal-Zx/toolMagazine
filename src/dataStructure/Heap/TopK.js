const MinHeap = require("./minHeap")

function TopK(nums, k) {
  // 1. 初始化一个小顶堆, 并将数组前 k 个元素入堆（下标为 [0, k - 1]）
  const minHeap = new MinHeap(nums.slice(0, k))
  console.log(minHeap.print())
  // 2. 从 k+1 个元素（下标为 k）开始，若 nums[k + 1] > minHeap.peek() ，则将堆顶出堆，nums[k + 1] 入堆并执行堆化
  for (let i = k, len = nums.length; i < len; i++) {
    if (nums[i] > minHeap.peek()) {
      minHeap.pop()
      minHeap.push(nums[i])
    }
  }
  return minHeap.print()
}

console.log(TopK([1, 7, 6, 3, 2], 3))
