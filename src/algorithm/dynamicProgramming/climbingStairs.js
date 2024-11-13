/** NOTE: 爬楼梯问题 */

// 方法一：递归暴力搜索
// 时间 O(2^n)
let time1 = performance.now()
function climbingStairsDFS(n) {
  if (n <= 2) return n

  return climbingStairsDFS(n - 1) + climbingStairsDFS(n - 2)
}
let time2 = performance.now()
console.log("==> climbingStairsDFS", climbingStairsDFS(35), time2 - time1)

// 方法二：递归记忆化搜索，自顶至底
// 时间 O(n)
let time3 = performance.now()
function climbingStairsDFSMem(n, map) {
  if (n <= 2) return n

  if (map.has(n)) return map.get(n)
  const count =
    climbingStairsDFSMem(n - 1, map) + climbingStairsDFSMem(n - 2, map)
  map.set(n, count)
  return count
}
let time4 = performance.now()
console.log(
  "==> climbingStairsDFSMem",
  climbingStairsDFSMem(35, new Map()),
  time4 - time3
)

// 方法三：动态规划（状态压缩），自底至顶
// 时间 O(n)，空间 O(1)
const time5 = performance.now()
function climbingStairsDP(n) {
  const dp = Array(2)
  dp[0] = 1
  dp[1] = 2

  for (let i = 3; i <= n; ++i) {
    tmp = dp[0] + dp[1]
    dp[0] = dp[1]
    dp[1] = tmp
  }
  return dp[1]
}
const time6 = performance.now()
console.log("==> climbingStairsDP", climbingStairsDP(35), time6 - time5)

/**
 * “难度升级”例题：通过升维来使问题满足动归的「无后效性」（给定一个确定的状态，它的未来发展只与当前状态有关，而与当前状态过去所经历过的所有状态无关。）
 * Question: 给定一个共有 n 阶的楼梯，你每步可以上 1 阶或者 2 阶，但不能连续两轮跳 1 阶，请问有多少种方案可以爬到楼顶。
 *
 * DP 方程定义：dp[i, j] 表示跳到第 i 阶时，上一轮跳 j 阶的方案数，其中 j ∈ [1,2]
 * dp[i, 1] = dp[i - 1, 2]
 * dp[i, 2] = dp[i - 2, 1] + dp[i - 2, 2]
 */
