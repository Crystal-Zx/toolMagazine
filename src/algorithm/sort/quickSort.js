const swap = require('./swap')

/**
 * NOTE: 快速排序：
 * 基于分治的思想。取数组左端点为「基准数 base」，用指针 i，j 指向数组首尾两端，向内遍历将数组划分为左子数组（均小于 base）和右子数组（均大于 base）。
 * 1. 用 j 从尾部往前找第一个小于 base 的数，找到后停止
 * 2. 用 i 从头往后找第一个大于 base 的数，找到后停止
 * 3. 交换 i,j 对应的数
 * 4. 重复 1-3，直到 i,j 相遇（此时两者指向的数为小于 base 的数）
 * 5. 将 base 与 i,j 相遇处的数交换，完成排序
 * @param {Number[]} nums 待排序的数组
 */
function quickSort(nums, left = 0, right = nums.length - 1) {
  // 已排序 nums 直接返回
  let isSorted = true
  for (let i = left; i < right; i++) {
    if (nums[i] > nums[i + 1]) {
      isSorted = false
      break
    }
  }
  if (isSorted) return

  // 递归终止条件
  // if (left >= right) return
  while (left < right) {
    // 哨兵划分
    const pivot = partition(nums, left, right)
    // 递归地对左子数组和右子数组进行快速排序
    // NOTE: 优化策略二：尾递归优化，每次仅对更短的子数组做快排，保证其数组长度不超过 n / 2，将最差空间复杂度降至 O(logn)
    if (pivot - left < right - pivot) {
      // 左子数组长度更短，对它进行快排
      quickSort(nums, left, pivot - 1)
      left = pivot + 1 // 剩余未排序区间为 [pivot + 1, right]
    } else {
      quickSort(nums, pivot + 1, right)
      right = pivot - 1 // 剩余未排序区间为 [left, pivot - 1]
    }
  }
}

/** NOTE: 哨兵划分 第一版 */
// function partition(nums, left, right) {
//   let med = medianThree(nums, left, right) // 中位数下标
//   swap(nums, left, med)
//   // 以 left 下标对应的值作为基准数（NOTE: 交换后已经是首尾中三数中的中位数了，降低时间复杂度劣化风险）
//   let i = left,
//     j = right
//   // NOTE: 当我们以最左端元素为基准数时，必须先“从右往左”再”从左往右“，原因是：先向前移动 j，再向后移动 i，这能保证两指针相遇时指向的一定是小于哨兵节点值的数，这才能在循环结束时交换相遇节点和哨兵节点，保证排序次序
//   while (i < j) {
//     while (i < j && nums[j] >= nums[left]) j--
//     while (i < j && nums[i] <= nums[left]) i++
//     swap(nums, i, j)
//   }
//   swap(nums, left, j)
//   return j
// }

/** NOTE: 哨兵划分 第二版 更优解（对有大量重复数据的样例更友好） */
function partition(nums, left, right) {
  let idx = left + Math.floor(Math.random() * (right - left + 1))
  const pivot = nums[idx]
  swap(nums, left, idx)

  // 2. 相向双指针遍历子数组 [left + 1, right]
  // 循环不变量：在循环过程中，子数组的数据分布始终如下图
  // [ pivot | <=pivot | 尚未遍历 | >=pivot ]
  //   ^                 ^     ^         ^
  //   left              i     j         right

  let i = left + 1,
    j = right
  while (true) {
    while (i <= j && nums[i] < pivot) i++
    // 此时 nums[i] >= pivot

    while (i <= j && nums[j] > pivot) j--
    // 此时 nums[j] <= pivot

    if (i >= j) break

    // 维持循环不变量
    swap(nums, i, j)
    i++
    j--
  }

  // 循环结束后
  // [ pivot | <=pivot | >=pivot ]
  //   ^             ^   ^     ^
  //   left          j   i     right

  swap(nums, left, j) // 这里只能与 j 交换
  return j
}

// NOTE: 优化策略一：优化基准数选取（增大随机性，避免逆序数组劣化风险）
// 求首尾中三数中的中位数的下标
// function medianThree(
//   nums,
//   left,
//   right,
//   mid = Math.floor(left + (right - left) / 2)
// ) {
//   const l = nums[left],
//     r = nums[right],
//     m = nums[mid]
//   if ((l > m) ^ (l > r)) return left
//   if ((r > l) ^ (r > m)) return right
//   return mid
// }
// TEST: 求三数中位数测试用例
// const nums1 = [4, 26, 67]
// console.log("==> medianThree", medianThree(nums1, 0, 2))

/**
 * 复杂度分析：
 * 时间：O(nlogn)。
 * 平均情况下O(nlogn)，哨兵划分总层数（递归深度）为 logn ；每一层递归中 partition 方法内循环总数为 n，故为 O(nlogn)
 * 最差情况下0(n^2)：哨兵划分每一层递归都将数据划分为 0 和 n - 1 两部分，此时递归总层数达到 n，结合每一层的复杂度 n，总计为 O(n^2)
 *
 * 空间：O(n)。原地排序，指针消耗常数大小额外空间，但使用的栈空间为递归层数，平均 O(logn)，最差 O(n)）
 *
 * 非稳定排序：在哨兵划分的最后一步，基准数可能会被交换至相等元素的右侧。
 */

// TEST: 测试用例
const n = [2, 4, 1, 0, 3, 5]
quickSort(n)
console.log(n)
