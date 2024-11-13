const swap = require("./swap")

/**
 * NOTE: 选择排序：开启一个循环，每轮从未排序区间选择最小的元素，将其放到已排序区间的末尾。
 * @param {Number[]} nums 待排序的数组
 */
function selectionSort(nums) {
  let n = nums.length
  let k = 0 // k 用来记录当前轮次最小数的下标
  for (let i = 0; i < n - 1; ++i) {
    // 最后剩一个未排序的元素一定是最大值，不用再计算
    k = i // 不要忘记每一轮将 k 置为 i
    for (let j = i + 1; j < n; ++j) {
      if (nums[k] > nums[j]) k = j
    }
    swap(nums, i, k)
  }
  return nums
}

/**
 * 复杂度分析：
 * 时间：O(n^2)。外循环一共 n - 1 次，内循环对未排序数组进行循环求极值，第一轮 n 次，最后一轮 2 次，求和为：
 * [(n + 2)(n - 1)] / 2
 * 空间：O(1)。原地排序，指针消耗常数大小额外空间。
 *
 * 非稳定排序。例如：[4,4,3,1,5,2]，在第一轮时会将下标为 0 的值 4 与值 1 交换，这就导致两个 4 失去了一开始的顺序。
 */
console.log(selectionSort([25, 32, 4, 1, 34, 10, 51, 29]))
