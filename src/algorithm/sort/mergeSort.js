/**
 * NOTE: 归并排序：分为划分和合并两个阶段。首先将数组不断地从中点划分成两个子数组，直至子数组长度为 1 时停止划分；合并阶段，从长度为1的子数组开始往回合并，持续地将相邻两个有序数组进行大小合并。
 * @param {Number[]} nums 待排序的数组
 */
function mergeSort(nums) {
  const len = nums.length
  if (len <= 1) return nums

  const mid = Math.floor((len - 1) / 2)
  const left = nums.slice(0, mid + 1)
  const right = nums.slice(mid + 1, len)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const lLen = left.length,
    rLen = right.length
  const res = Array(lLen + rLen)
  let i = (j = k = 0)
  while (i < lLen && j < rLen) {
    if (left[i] < right[j]) {
      res[k++] = left[i++]
    } else {
      res[k++] = right[j++]
    }
  }
  while (i < lLen) res[k++] = left[i++]
  while (j < rLen) res[k++] = right[j++]

  return res

  // NOTE: 下面的代码就是插入排序了，没有充分利用到两个数组都是有序的特性，时间复杂度过高，会使得归并排序没有优势 ❌
  // let j = mid + 1
  // while (j <= right) {
  //   const num = nums[j]
  //   let i = j - 1
  //   while (i >= 0 && num < nums[i]) {
  //     nums[i + 1] = nums[i]
  //     i--
  //   }
  //   nums[i + 1] = num
  //   j++
  // }
}

/**
 * 复杂度分析：
 * 时间：O(nlogn)。一共划分层数 logn，每层的归并操作数为 n
 *
 * 空间：O(n)。递归深度为 logn，消耗 logn 的栈帧空间；每层的归并操作需要借助长度为 left.length + right.length 的辅助数组，故取更大值 n。
 *
 * 稳定排序：在归并过程中，相等两数次序能够保持不变。
 */
const nums = [7, 3, 4, 2, 6]
console.log(mergeSort(nums))

// NOTE: 归并排序在链表排序中有优势，空间复杂度可优化至O(1): https://www.hello-algo.com/chapter_sorting/merge_sort/#1163
