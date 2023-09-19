/**
 * NOTE: 二分查找模板，包含：
 * 1. 二分的三种基础写法（闭区间 | 左闭右开 | 开区间）
 * 2. 目标值的四种情况（> target | ≥ target | < target | ≤ target）
 */

/** 1. 基础写法：找出 nums 中第一个 ≥ target 元素的下标 */
// 1) 闭区间
function lowerBound1(nums, target) {
  let left = 0,
    right = nums.length - 1 // 初始化左右指针，此时搜索范围为 [left, right]
  while (left <= right) {
    // 当搜索范围不为空时持续二分查找
    let mid = (left + right) >> 1 // 计算中间元素下标（向下取整）
    if (nums[mid] < target) {
      left = mid + 1 // [mid + 1, right]
    } else {
      right = mid - 1 // [left, mid - 1]
    }
  }
  return left
}
console.log("==> lowerBound1", lowerBound1([5, 7, 7, 8, 8, 10], 8))

// 2) 左闭右开区间
function lowerBound2(nums, target) {
  let left = 0,
    right = nums.length // 初始化左右指针，此时搜索范围为 [left, right)
  while (left < right) {
    // 当搜索范围不为空时持续二分查找
    let mid = (left + right) >> 1 // 计算中间元素下标（向下取整）
    if (nums[mid] < target) {
      left = mid + 1 // [mid + 1, right)
    } else {
      right = mid // [left, mid)
    }
  }
  return left
}
console.log("==> lowerBound2", lowerBound2([5, 7, 7, 8, 8, 10], 8))

// 3) 开区间
function lowerBound3(nums, target) {
  let left = -1,
    right = nums.length // 初始化左右指针，此时搜索范围为 (left, right)
  while (left + 1 < right) {
    // 当搜索范围不为空时持续二分查找
    let mid = (left + right) >> 1 // 计算中间元素下标（向下取整）
    if (nums[mid] < target) {
      left = mid // (mid, right)
    } else {
      right = mid // (left, mid)
    }
  }
  return right // 注意这里应返回 right
}
console.log("==> lowerBound3", lowerBound3([5, 7, 7, 8, 8, 10], 8))

// 「TIPS」如何确定最终应该返回 left 还是 right 呢？牢记区间右侧是大于等于 target 的，左侧是小于等于 target 的。
// 开区间时，(left, right) 表示从 right 开始才是 ≥ target 的，故应返回 right

/**
 * 2. 目标值的四种情况
 * 上文中我们求的是 ≥ target 的情况，那么其余三种情况如何求解呢？可以通过 ≥ target 变换而来：
 * 1) > target 可转换为 ≥ target + 1
 * 2) < target 可转换为 lowerBound(nums, targe) - 1
 * 3) ≤ target 可转换为 lowerBound(nums, target + 1) - 1
 * */

/**
 * 了解完基础写法模板之后，我们来看这道题的题解，题目描述如下：
 * 34. 在排序数组中查找元素的第一个和最后一个位置（https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/）
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 *
 * example:
 * 1. nums = [5,7,7,8,8,10], target = 8  ==> [3,4]
 * 2. nums = [5,7,7,8,8,10], target = 6  ==> [-1,-1]
 *
 *
 * 解题思路：
 * 1. 先求 start 下标，即求 nums 中第一个 ≥ target 的下标：lowerBound(nums, 8)
 * 2. 求出 start 之后需要验证一下 start 下标是否越界（nums 中值均小于 target，left 会越界到 nums.length），或 nums[start] !== target（nums 中的值均大于 target，right 会越界到 -1，此时 left 仍为初始下标值） ★★★
 * 3. 再求 end 下标，即求 nums 中第一个 > target 的下标：lowerBound(nums, 8 + 1) - 1
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const start = lowerBound1(nums, target)
  if (start === nums.length || nums[start] !== target) return [-1, -1]
  const end = lowerBound1(nums, target + 1) - 1
  return [start, end]
}
console.log("==> searchRange", searchRange([5, 7, 7, 8, 8, 10], 8))
console.log("==> searchRange", searchRange([5, 7, 7, 8, 8, 10], 6))
