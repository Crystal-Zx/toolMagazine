/** 零钱兑换问题 - 贪心解法 */
// 贪心的解题步骤：问题分析、贪心策略确定、正确性证明
// 给定 n 种硬币，第 i 个硬币的面值为 coins[i - 1]，目标金额为 amt，每种硬币可以重复选取，问能够凑出目标金额的最少硬个数。如果无法凑出目标金额则返回 -1。
function coinChange(coins, amt) {
  coins.sort((a, b) => a - b)
  let i = coins.length - 1,
    count = 0
  while (amt > 0) {
    while (i > 0 && coins[i] > amt) i--
    amt -= coins[i]
    count++
  }
  return amt === 0 ? count : -1
}
console.log(coinChange([1, 5, 10, 20, 50, 100], 131))

// TIPS: 贪心算法求解零钱兑换问题时，无法保证找出来的值是最优解，如 coins = [1, 20, 50], amt = 60 时，贪心可能会得出 11 ，即 1 + ... + 1 (10个) + 50，而全局最优解应是 3 ，即 20 + 20 + 20
