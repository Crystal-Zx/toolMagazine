/** NOTE: 背包问题 */

/**
 * 0-1 背包
 * 解题思路：
 * 1. 思考每轮的决策，定义状态，从而得到 dp 表
 * 2. 找出最优子结构，进而推导出状态转移方程
 * 3. 确定边界条件和状态转移顺序
 * @param {Number} n 物品个数
 * @param {Number[]} w 各物品重量
 * @param {Number[]} v 各物品价值
 * @param {Number} cap 背包总容量
 * @returns
 */
// 给定 n 个物品，第 i 个物品的重量为 w[i - 1]、价值为 v[i - 1]，和一个容量为 cap 的背包。每个物品只能选择一次，问在不超过背包容量下能放入物品的最大价值。
// DP 定义：dp[i][c] 表示前 i 个物品放入剩余容量为 c 的背包里的最大价值
function knapsack(n, w, v, cap) {
  // dp 数组初始化：dp[i][0] 和 dp[0][c] 表示剩余容量为 0 和 物品数量为 0 时他们的最大价值都为 0
  const dp = Array.from({ length: n + 1 }, () => Array(cap + 1).fill(0))

  for (let i = 1; i <= n; ++i) {
    for (let c = 1; c <= cap; ++c) {
      if (c - w[i - 1] >= 0) {
        // 放入和不放入当前物品取最大价值
        dp[i][c] = Math.max(dp[i - 1][c], dp[i - 1][c - w[i - 1]] + v[i - 1])
      } else {
        // 当前物品重量超过剩余背包容量，则不放入
        dp[i][c] = dp[i - 1][c]
      }
    }
  }
  return dp[n][cap]
}
// -- 进阶：倒序遍历状态压缩，降低空间复杂度
function knapsackComp(n, w, v, cap) {
  const dp = Array(cap + 1).fill(0)

  for (let i = 1; i <= n; ++i) {
    for (let c = cap; c >= 1; --c) {
      if (c - w[i - 1] >= 0) {
        dp[c] = Math.max(dp[c], dp[c - w[i - 1]] + v[i - 1])
      }
    }
  }
  return dp[cap]
}
// TEST:
const maxValue = knapsackComp(
  5,
  [10, 20, 30, 40, 50],
  [60, 100, 120, 160, 200],
  50
)
console.log("==> 0-1背包：", maxValue)

/**
 * 完全背包问题：与 0-1背包问题的区别在于物品可以被重复选择
 * @param {*} n
 * @param {*} w
 * @param {*} v
 * @param {*} cap
 */
function unboundedKnapsack(n, w, v, cap) {
  const dp = Array.from({ length: n + 1 }, () => Array(cap + 1).fill(0))

  for (let i = 1; i <= n; ++i) {
    for (let c = 1; c <= cap; ++c) {
      if (c - w[i - 1] >= 0) {
        dp[i][c] = Math.max(dp[i - 1][c], dp[i][c - w[i - 1]] + v[i - 1])
      } else {
        dp[i][c] = dp[i - 1][c]
      }
    }
  }
  return dp[n][cap]
}

function unboundedKnapsackComp(n, w, v, cap) {
  const dp = Array(cap + 1).fill(0)

  for (let i = 1; i <= n; ++i) {
    for (let c = 1; c <= cap; ++c) {
      if (c - w[i - 1] >= 0) {
        dp[c] = Math.max(dp[c], dp[c - w[i - 1]] + v[i - 1])
      }
    }
  }
  return dp[cap]
}
// TEST:
const maxValue1 = unboundedKnapsackComp(
  5,
  [10, 20, 30, 40, 50],
  [50, 120, 150, 210, 240],
  50
)
console.log("==> 完全背包：", maxValue1)
