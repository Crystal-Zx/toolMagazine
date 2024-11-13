/**
 * NOTE: 计数排序（简单版，不能保证稳定排序）：通过统计元素出现次数完成排序，适用于非负整数数组排序。
 * （本质上，计数排序是桶排序在整型数据下的一个特例）
 * @param {*} nums 待排序数组，数组元素均为非负整数
 */
function countingSortNaive(nums) {
  const len = nums.length
  let max = nums[0]

  // 1. 找到数组中的最大值
  for (let i = 1; i < len; ++i) {
    max = Math.max(max, nums[i])
  }

  // 2. 创建 counter 辅助数组 && 遍历计数
  let counter = new Array(max + 1).fill(0)
  for (let i = 0; i < len; ++i) {
    counter[nums[i]] += 1
  }

  // 3. 复原排序
  let i = 0
  for (let j = 0; j < max + 1; ++j) {
    let count = counter[j]
    while (count--) nums[i++] = j
  }
}
// const nums = [1, 0, 1, 2, 0, 4, 0, 3, 2, 4, 7, 9, 12, 7]
// countingSortNaive(nums)
// console.log(nums)

/**
 * NOTE: 计数排序（完整版，可稳定排序）：通过统计元素出现次数完成排序，适用于非负整数数组排序。
 * 此版本最后一步是对原数组 nums 进行遍历排序，故相比简单版本（仅遍历 counter 数组完成排序，数组值仅能为下标能表示的值），原始数据可以是对象或其他形式
 * @param {*} nums 待排序数组，数组元素均为非负整数
 */
function countingSort(nums) {
  const len = nums.length
  let max = nums[0]

  // 1. 找到数组中的最大值
  for (let i = 1; i < len; ++i) {
    max = Math.max(max, nums[i])
  }

  // 2. 创建 counter 辅助数组 && 遍历计数
  let counter = new Array(max + 1).fill(0)
  for (let i = 0; i < len; ++i) {
    counter[nums[i]] += 1
  }

  // 3. 计算 counter 数组的前缀和， counter 的下标为 nums 中的元素 num
  /**
   * NOTE: 关于前缀和与结果数组中最后一次下标的计算：
   * counter[num] 表示 num 在 nums 数组中出现的总次数
   * prefix 数组作为 counter 的前缀和，prefix[num] 表示 nums 元素中小于等于 num 的元素个数总和，故 num 在最终排好序的结果数组 res 中最后一次出现的位置是 prefix[num] - 1
   */
  const prefix = [counter[0]]
  for (let i = 1; i < max + 1; ++i) {
    prefix[i] = prefix[i - 1] + counter[i]
  }

  // 4. prefix[num] - 1 是 num 在结果数组中最后出现位置的下标
  let res = []
  // NOTE: 倒序遍历确保稳定排序（正序遍历也可以得到正确值，只是不能保证稳定排序）
  for (let i = len - 1; i >= 0; --i) {
    const num = nums[i]
    res[prefix[num] - 1] = num
    prefix[num] -= 1
  }
  return res
}
const nums = [1, 0, 1, 2, 0, 4, 0, 2, 2, 4]
console.log(countingSort(nums))
// console.log(nums)

/**
 * 复杂度分析：
 * 1. 时间复杂度：O(n + m)，n 为 nums 长度， m 为 最大值 max。（一般情况下，n >> m，复杂度趋近于 O(n)）
 * 2. 空间复杂度：O(n + m)，结果数组 res 和 prefix 各占 n 和 m 的空间
 */

/**
 * 适用场景：
 * 1. 计数排序只适用于非负整数：若需要使用其他类型值，需确保这些数据可以被转换成非负整数，且不会改变元素之间的相对大小关系。如包含负数的数组，可以先将所有值加上一个常数后使用计数排序，之后再减掉这个常数。
 * 2. 计数排序适用于数据量大但数据范围较小的情况：这样可以使得时间复杂度尽可能的趋近于 O(n)
 * （当 m >> n 时，计数排序使用 O(m) 时间，可能比 O(nlogn) 的排序算法还要慢。）
 */
