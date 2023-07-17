/**
 * NOTE:
 * [ Medium ] [ leetcode - 2289 ] 使数组按非递减顺序排列
 * https://leetcode.cn/problems/steps-to-make-array-non-decreasing/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// NOTE: 方法一 暴力搜索（leetcode 会超时 ❌）
var totalSteps1 = function (nums) {
  let ans = 0,
    stack = [],
    data = nums

  while (true) {
    let prevNum = null
    for (let i = 0; i < data.length; i++) {
      if (prevNum) {
        if (prevNum > data[i]) {
          prevNum = data[i]
        } else {
          prevNum = null
          stack.push(data[i])
        }
        continue
      }
      if (stack.length && stack[stack.length - 1] > data[i]) {
        prevNum = data[i]
      } else {
        stack.push(data[i])
      }
    }
    if (stack.length === data.length) return ans
    data = stack
    stack = []
    ans++
  }
}

// NOTE: 方法二 单调栈
// 思路：由题意可知，当前元素的左边有比之更大的元素时，当前元素会被删除，以保持 nums 数组的非递减性。单调栈中存的是遍历到当前位置时，该元素若被删除需要的操作步骤数。由于单调栈是非递增的，故当栈中没有值时，说明当前元素前面没有比它更大的值，也就不需要将其删除，操作数为0。
/**
 * [9   1   2   4    3    5    5]
 *
 * 9
 * -----------------------------6
 * ------------------------5
 * -------------4
 * -------------------3
 * --------2
 * ----1
 *
 *---------------------------------
 * 单调递减队列
 * 到 1 的时候 9 在队列中 所以 1 是 需要被删除的 时间点为 1
 * 到 2 的时候 9 1 在队列中,要删除 2 需要先删除 1, 时间点为 1 t(1)+1
 * 到 4 的时候 9 2 在队列中,要删除 4 需要先删除 2, 时间点为 2 t(2)+1
 * 到 3 的时候 9 4 在队列中,要删除 3 不需要先删除其他的值,所以删除3的时间点为 1
 * 到 5 的时候 9 4 3 在队列中,要删除 5 需要先删除 4, 3,所以删除5的时间点为 t(4)+1
 * 到 6 的时候 9 5 在队列中,要删除 6 需要先删除 5,所以删除6的时间点为 t(5)+1
 *
 * ------ (参考评论区的题解注释 https://leetcode.cn/problems/steps-to-make-array-non-decreasing/comments/ )
 */
var totalSteps2 = function (nums) {
  const stack = []
  let ans = 0
  for (let n of nums) {
    let maxT = 0
    while (stack.length && stack[stack.length - 1][0] <= n) {
      maxT = Math.max(maxT, stack.pop()[1])
    }
    maxT = !stack.length ? 0 : maxT + 1
    stack.push([n, maxT])
    ans = Math.max(ans, maxT)
  }
  return ans
}

console.log(totalSteps2([9, 1, 2, 4, 3, 5, 5]))
// console.log(totalSteps2([10, 1, 2, 3, 4, 5, 6, 1, 2, 3]))
// console.log(totalSteps([4, 5, 7, 7, 13]))
// console.log(totalSteps2([5, 3, 4, 4, 7, 3, 6, 11, 8, 5, 11]))
