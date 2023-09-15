/**
 * NOTE: [ Easy ] [ LCP - 50 ] 宝石补给（https://leetcode.cn/problems/WHnhjV）
 * @param {number[]} gem
 * @param {number[][]} operations
 * @return {number}
 */
var giveGem = function (gem, operations) {
  operations.forEach(([x, y]) => {
    const val = gem[x] >> 1
    if (!val) return true
    gem[x] -= val
    gem[y] += val
  })
  return Math.max(...gem) - Math.min(...gem)
}

console.log(
  giveGem(
    [0, 2, 5, 4],
    [
      [3, 2],
      [3, 2],
      [1, 3],
      [0, 2],
      [3, 0],
      [3, 1],
      [0, 3],
      [2, 1],
      [3, 0],
    ]
  )
)
