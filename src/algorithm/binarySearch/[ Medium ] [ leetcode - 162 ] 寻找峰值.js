/**
 * [ Medium ] [ leetcode - 162 ] 寻找峰值（https://leetcode.cn/problems/find-peak-element）
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  const n = nums.length
  let left = -1,
    right = n - 1 // 采用开区间 (left, right)
  let mid
  while (left + 1 < right) {
    mid = (left + right) >> 1
    if (nums[mid] < nums[mid + 1]) {
      // mid 在峰顶左侧
      left = mid
    } else {
      // mid 为峰顶或在峰顶右侧
      right = mid
    }
  }
  return right
}
