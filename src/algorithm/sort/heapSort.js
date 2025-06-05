const swap = require('./swap')

/**
 * NOTE: 堆排序：利用大顶堆的出堆操作稍作改动完成排序
 * @param {*} nums 待排序的数组
 */
function heapSort(nums) {
  let len = nums.length
  // 构建大顶堆，时间 O(n)
  for (let i = len - 1; i >= 0; --i) {
    siftDown(nums, i)
  }
  // 执行出堆操作（执行 len - 1 次）
  // while (len > 1) {
  //   swap(nums, 0, len - 1)
  //   siftDown(nums, 0, --len) // 花费时间 O(logn)
  // }
  for (let i = len - 1; i >= 0; i--) {
    swap(nums, 0, i)
    siftDown(nums, 0, i)
  }
  return nums
}

/**
 * 自顶向下的堆化
 * @param {Array[]} nums 待堆化的大顶堆
 * @param {Number} i 从下标为 i 的点向下完成堆化
 * @param {Number} len 当前堆的长度
 */
function siftDown(nums, i, len = nums.length) {
  let max, l, r

  while (true) {
    l = 2 * i + 1
    r = l + 1
    max = i

    if (l < len && nums[l] > nums[max]) max = l
    if (r < len && nums[r] > nums[max]) max = r

    if (max === i) break

    swap(nums, i, max)
    i = max
  }
}

/**
 * 复杂度分析：
 * 1. 时间复杂度：O(nlogn)。建堆使用 O(n)；每一轮从堆中选取最大值且从堆顶向下执行堆化使用 O(logn)，一共执行 len - 1 次，故后续使用O(nlogn)，综合来取最大值为 O(nlogn)。
 * 2. 空间复杂度：O(1)。数组原地排序，未使用额外辅助空间。
 *
 * 非稳定排序。
 *
 * NOTE: 与大顶堆的出栈唯一不同的是，大顶堆出栈是直接弹出元素，若采用这种方法来排序，需要借助一个辅助栈来存弹出的元素。但堆排序这里仅仅是将堆顶元素放置到数组末尾，并且将堆长度减一来实现原地排序。
 */
// console.log(heapSort([3, 4, 5, 1, 1, 2]))
console.log(heapSort([25, 32, 4, 1, 34, 10, 51, 29]))
