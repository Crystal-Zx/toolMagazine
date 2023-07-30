/**
 * NOTE: 归并排序：分为划分和合并两个阶段。首先将数组不断地从中点划分成两个子数组，直至子数组长度为 1 时停止划分；合并阶段，从长度为1的子数组开始往回合并，持续地将相邻两个有序数组进行大小合并。
 * @param {Number[]} nums 待排序的数组
 */
function mergeSort(nums, left = 0, right = nums.length - 1) {
  if (left >= right) return
  const mid = Math.floor((left + right) / 2)

  mergeSort(nums, left, mid)
  mergeSort(nums, mid + 1, right)
  merge(nums.slice(left, mid + 1), nums.slice(mid + 1, right))
}

function merge(nums1, nums2) {
  console.log(nums1, nums2)
}
console.log(mergeSort([7, 3, 4, 2, 6]))
