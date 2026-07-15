/*
 * 题目：[ 技巧题 ] 31.下一个排列
 * 日期：26.7.14
 * 解题思路：
 *  1. 从右往左遍历数组，找出第一个小于其右侧数的 x；
 *  2. 将 x 与其右侧（从右往左）第一个大于 x 的数 y 交换；
 *  3. 交换后，将 y 右侧所有数升序排列（交换后 y 右侧依旧是递减的）；
 *  4. 特殊的，若没有符合的 x，则跳过第二步，直接第三步
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const n = nums.length
  let target = -1
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      target = i
      break
    }
  }

  if (target >= 0) {
    for (let i = n - 1; i > target; i--) {
      if (nums[i] > nums[target]) {
        ;[nums[target], nums[i]] = [nums[i], nums[target]]
        break
      }
    }
  }

  let st = target + 1,
    ed = n - 1
  while (st < ed) {
    ;[nums[st], nums[ed]] = [nums[ed], nums[st]]
    st++
    ed--
  }
}
