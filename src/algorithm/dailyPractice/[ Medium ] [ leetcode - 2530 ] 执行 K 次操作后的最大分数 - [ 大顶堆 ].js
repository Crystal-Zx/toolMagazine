const MaxHeap = require("../../dataStructure/Heap/maxHeap")
/**
 * [ Medium ] [ leetcode - 2530 ] 执行 K 次操作后的最大分数
 * （https://leetcode.cn/problems/maximal-score-after-applying-k-operations/）
 * 解题思路：大顶堆。时间 O(n + klogn)，空间 O(n)
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxKelements = function (nums, k) {
  let ans = 0
  const heap = new MaxHeap(nums)
  while (k) {
    let max = heap.pop()
    ans += max
    max = Math.ceil(max / 3)
    heap.push(max)
    k--
  }
  return ans
}
console.log(maxKelements([1, 10, 3, 3, 3], 3))
