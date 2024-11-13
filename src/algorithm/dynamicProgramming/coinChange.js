/** NOTE: 零钱兑换问题 -- 完全背包问题的一种特例 */

/**
 * 零钱兑换I
 * 给定 n 种硬币，第 i 个硬币的面值为 coins[i - 1]，目标金额为 amt，每种硬币可以重复选取，问能够凑出目标金额的最少硬个数。如果无法凑出目标金额则返回 -1。
 * [TIPS] 关于 MAX 值的选取本来可以选择 Number.MAX_SAFE_INTEGER ，但代码中涉及 MAX + 1 的操作，这会使得数值越界，故我们采用本题中「理论最大值」amt 作为边界（硬币面额最小为1，凑出amt值硬币个数最多情况下为 amt 个，不可能会大于 amt + 1）
 * @param {Number} n 硬币种类数
 * @param {Number[]} coins 各硬币面额数组
 * @param {Number} amt 需要凑整的零钱数额
 * @returns 能够凑出目标金额的最少硬个数。如果无法凑出目标金额则返回 -1
 */
function coinChangeI(n, coins, amt) {
  const MAX = amt + 1
  const dp = Array.from({ length: n + 1 }, () => Array(amt + 1))
  for (let a = 0; a <= amt; ++a) {
    dp[0][a] = MAX
  }
  for (let i = 0; i <= n; ++i) {
    dp[i][0] = 0
  }

  for (let i = 1; i <= n; ++i) {
    for (let a = 1; a <= amt; ++a) {
      if (a >= coins[i - 1]) {
        dp[i][a] = Math.min(dp[i - 1][a], dp[i][a - coins[i - 1]] + 1)
      } else {
        dp[i][a] = dp[i - 1][a]
      }
    }
  }
  return dp[n][amt] !== MAX ? dp[n][amt] : -1
}
console.log("==> coinChangeI", coinChangeI(3, [1, 2, 5], 11))

// -- 进阶版：状态压缩
function coinChangeCompI(n, coins, amt) {
  const MAX = amt + 1
  const dp = Array(amt + 1).fill(MAX)
  dp[0] = 0

  for (let i = 1; i <= n; ++i) {
    for (let a = 1; a <= amt; ++a) {
      if (a >= coins[i - 1]) {
        dp[a] = Math.min(dp[a], dp[a - coins[i - 1]] + 1)
      }
    }
  }
  return dp[amt] !== MAX ? dp[amt] : -1
}
console.log("==> coinChangeCompI", coinChangeCompI(3, [1, 2, 5], 11))

/**
 * 零钱兑换II
 * 给定 n 种硬币，第 i 个硬币的面值为 coins[i - 1]，目标金额为 amt ，每种硬币可以重复选取，问在凑出目标金额的硬币组合数量。
 * @param {Number} n 硬币种类数
 * @param {Number[]} coins 各硬币面额数组
 * @param {Number} amt 需要凑整的零钱数额
 * @returns 凑出目标金额的硬币组合数量
 */
function coinChangeII(n, coins, amt) {
  const dp = Array.from({ length: n + 1 }, () => Array(amt + 1))
  for (let a = 0; a <= amt; ++a) {
    dp[0][a] = 0
  }
  for (let i = 0; i <= n; ++i) {
    dp[i][0] = 1
  }

  for (let i = 1; i <= n; ++i) {
    for (let a = 1; a <= amt; ++a) {
      if (a >= coins[i - 1]) {
        dp[i][a] = dp[i - 1][a] + dp[i][a - coins[i - 1]]
      } else {
        dp[i][a] = dp[i - 1][a]
      }
    }
  }
  return dp[n][amt]
}
console.log("==> coinChangeII", coinChangeII(3, [1, 2, 5], 5))

function coinChangeIIComp(n, coins, amt) {
  const dp = Array(amt + 1).fill(0)
  dp[0] = 1

  for (let i = 1; i <= n; ++i) {
    for (let a = 1; a <= amt; ++a) {
      if (a >= coins[i - 1]) {
        dp[a] = dp[a] + dp[a - coins[i - 1]]
      }
    }
  }
  return dp[amt]
}
console.log("==> coinChangeIIComp", coinChangeIIComp(3, [1, 2, 5], 5))
