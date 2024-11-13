/**
 * [ Medium ] [ leetcode - 1155 ] 掷骰子等于目标和的方法数
 * （https://leetcode.cn/problems/number-of-dice-rolls-with-target-sum）
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
// NOTE: 方法一 记忆化递归
var numRollsToTarget = function (n, k, target) {
  if (target < n || target > n * k) return 0
  const MOD = 10 ** 9 + 7
  // 记忆化递归：缓存
  const memo = Array.from({ length: n + 1 }, () =>
    Array(target - n + 1).fill(-1)
  )
  return dfs(n, target - n)
  // dfs(i,j) 求由 i 个数组成和为 j 的方案数
  function dfs(i, j) {
    if (!i) return Number(!j) // 注意：dfs(0,0) 边界条件应返回 1
    if (memo[i][j] !== -1) return memo[i][j]
    let sum = 0
    for (let x = 0; x < k && x <= j; x++) {
      sum = (sum + dfs(i - 1, j - x)) % MOD
    }
    return (memo[i][j] = sum) // 记忆化
  }
}

// NOTE: 方法二 动态规划
// dp[i][j] 表示由 i 个数组成和为 j 的方案数
// 递推公式：dp[i][j] = dp[i - 1][j - 1] + ... + dp[i - 1][j - min(k - 1, j)]
// 求：dp[n][target - n]
var numRollsToTargetDP = function (n, k, target) {
  if (target < n || target > n * k) return 0
  const MOD = 10 ** 9 + 7
  // dp 数组初始化
  const dp = Array.from({ length: n + 1 }, () => Array(target - n + 1).fill(0))
  dp[0][0] = 1

  for (let i = 1; i <= n; ++i) {
    for (let j = 0; j <= target - n; ++j) {
      for (let x = 0; x < k && x <= j; ++x) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j - x]) % MOD
      }
    }
  }
  return dp[n][target - n]
}

console.log(numRollsToTargetDP(2, 6, 7))
// console.log(numRollsToTargetDP(2, 5, 10))
// console.log(numRollsToTargetDP(30, 30, 500))
