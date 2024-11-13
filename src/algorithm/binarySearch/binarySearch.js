const createFib = require("../fibonacci")
const fibArr = createFib(10)

/**
 * NOTE: 二分查找（双闭区间）
 * @param {Array} nums 没有重复数的数组
 * @param {*} target 目标元素值
 * @returns 目标元素值在 nums 数组中的下标，没有则返回 -1
 */
/** 复杂度分析
 * 时间 O(logn) 每轮缩小一半，循环次数为 logn(2为底)
 * 空间 O(1)
 */
function binarySearch(nums, target) {
  let i = 0,
    j = nums.length - 1,
    m
  while (i <= j) {
    m = Math.floor(i + (j - i) / 2)
    const mid = nums[m]
    if (mid === target) return m
    if (target < mid) {
      j = m - 1
    } else {
      i = m + 1
    }
  }
  return -1
}
// console.log(fibArr.slice(1))
// console.log(binarySearch(fibArr.slice(1), 13))

/**
 * NOTE: 二分查找左边界（双闭区间）
 * @param {Array} nums 有重复数的数组
 * @param {*} target 目标元素值
 * @returns 目标元素值在 nums 数组中「第一次出现」的下标，没有则返回 -1
 */
function binarySearchLeft(nums, target) {
  let i = 0,
    j = nums.length - 1,
    m
  while (i <= j) {
    m = Math.floor(i + (j - i) / 2)
    const mid = nums[m]
    if (target > mid) {
      i = m + 1
    } else {
      // target <= mid
      j = m - 1
    }
  }
  // 最终，i 指向最左边的 target，j 指向首个小于 target 的元素
  return i >= nums.length || nums[i] !== target ? -1 : i
}
console.log("=====> 查找左边界 target")
const numsWithSameNum = [1, 3, 6, 6, 6, 6, 6, 7, 7, 10, 12, 15]
console.log(binarySearchLeft(numsWithSameNum, 6))

/**
 * NOTE: 二分查找右边界（双闭区间）
 * @param {Array} nums 有重复数的数组
 * @param {*} target 目标元素值
 * @returns 目标元素值在 nums 数组中「第一次出现」的下标，没有则返回 -1
 */
function binarySearchRight(nums, target) {
  let i = 0,
    j = nums.length - 1,
    m
  while (i <= j) {
    m = Math.floor(i + (j - i) / 2)
    const mid = nums[m]
    if (target >= mid) {
      i = m + 1
    } else {
      // target < mid
      j = m - 1
    }
  }
  // 最终，i 指向首个大于 target 的元素，j 指向最右边的 target
  return j < 0 || nums[j] !== target ? -1 : j
}
console.log("=====> 查找右边界 target")
// const numsWithSameNum = [1, 3, 6, 6, 6, 6, 6, 7, 7, 10, 12, 15]
console.log(binarySearchRight(numsWithSameNum, 6))
