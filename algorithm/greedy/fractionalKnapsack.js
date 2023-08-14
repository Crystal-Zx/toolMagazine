/**
 * 分数背包（0-1背包的变种问题）
 * @param {Number[]} w 物品重量
 * @param {Number[]} v 物品价值
 * @param {Number} cap 背包容量
 */
// 给定 n 个物品，第 i 个物品的重量为 w[i - 1]、价值为 v[i - 1]，和一个容量为 cap 的背包。每个物品只能选择一次，但可以选择物品的一部分，价值根据选择的重量比例计算，问在不超过背包容量下背包中物品的最大价值。
function fractionalKnapsack(w, v, cap) {
  const worth = []
  const len = w.length - 1
  let res = 0
  for (let i = 0; i < len; ++i) {
    worth[i] = [w[i], v[i] / w[i]] // 重量，单价
  }
  worth.sort((a, b) => a[1] - b[1])

  let i = len - 1
  while (cap > 0) {
    if (worth[i][0] >= cap) {
      return (res += worth[i][1] * cap)
    }
    res += worth[i][0] * worth[i][1]
    cap -= worth[i][0]
    i--
  }
}
console.log(
  fractionalKnapsack([10, 20, 30, 40, 50], [50, 120, 150, 210, 240], 50)
)
