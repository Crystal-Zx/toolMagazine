/**
 * NOTE: [ Medium ] [ leetcode - 198 ] 打家劫舍（https://leetcode.cn/problems/house-robber）
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：二维数组动归
var rob = function (nums) {
  const n = nums.length
  const dp = Array.from(Array(n), () => Array(2).fill(0))
  dp[0][0] = 0
  dp[0][1] = nums[0]
  for (let i = 1; i < n; ++i) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
    dp[i][1] = dp[i - 1][0] + nums[i]
  }
  return Math.max(...dp[n - 1])
}
/**
 * TIPS: 其实不用二维数组来做状态方程。一维的方式是：
 * dp[n] 表示「偷到第 n 间房时能偷到的最大金额」，那么 dp[n] = Math.max(dp[n - 1], dp[n - 2] + nums[i])
 * 可变式成：dp[n + 1] = Math.max(dp[n], dp[n - 1] + nums[i])
 *  */

console.log(rob([1, 2, 3, 1]))

// 方法二：空间优化后的动归（状态压缩），空间O(1)
var rob = function (nums) {
  let prev = 0,
    curr = 0,
    tmp
  for (let num of nums) {
    tmp = curr
    curr = Math.max(prev + num, curr)
    prev = tmp
  }
  return curr
}
