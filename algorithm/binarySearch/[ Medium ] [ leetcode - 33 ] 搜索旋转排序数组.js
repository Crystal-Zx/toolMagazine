const { lowerBound3 } = require("./base")

/**
 * [ Medium ] [ leetcode - 33 ] 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// NOTE: 两次二分（待改进成一次）
var search = function (nums, target) {
  // 1. 找出数组最小值，将 nums 切分成两个升序
  const minIdx = findMin(nums)
  let n,
    base = 0
  if (target > nums[nums.length - 1]) n = nums.slice(0, minIdx)
  else {
    n = nums.slice(minIdx)
    base = minIdx
  }

  // 2. 对每个升序做 lowerBound 查找
  const idx = lowerBound3(n, target)
  if (n[idx] === target) return base + idx
  return -1
}

function findMin(nums) {
  let left = -1,
    right = nums.length - 1
  let mid
  while (left + 1 < right) {
    mid = (left + right) >> 1
    if (nums[mid] < nums[right]) {
      right = mid
    } else {
      left = mid
    }
  }
  return right
}
console.log("==> search", search([4, 5, 6, 7, 0, 1, 2], 0))
// console.log("==> search", search([4, 5, 6, 7, 0, 1, 2], 6))
