const swap = require("./swap")

/**
 * NOTE: 冒泡排序：通过连续地比较与交换相邻元素实现排序
 * flag 标志位用于优化效率：当某一轮循环没有可交换的元素时，说明数组项两两之间都存在同一种大小关系，即已排好序，可以直接返回，减少不必要的循环。
 * @param {Number[]} nums 待排序的数组
 */
function bubbleSort(nums) {
  let flag
  for (let i = nums.length - 1; i > 0; --i) {
    flag = false
    for (let j = 0; j < i; ++j) {
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1)
        flag = true
      }
    }
    if (!flag) break
  }
  return nums
}

/**
 * 复杂度分析：
 * 时间：O(n^2)。
 * 最差和平均复杂度计算：外循环一共 n - 1 次，内循环对未排序数组进行循环求极值，第一轮 n - 1 次，最后一轮 1 次，求和为 n * (n - 1) / 2
 * 最佳复杂度：当数组本身已按照规则排好序时，复杂度可将至 O(n)
 * 空间：O(1)。原地排序，指针消耗常数大小额外空间。
 *
 * 稳定排序：比较相邻两数时，如相等两数不会进行交换，所以能保持之前的相对顺序
 */

console.log(bubbleSort([25, 32, 4, 1, 34, 10, 51, 29]))
