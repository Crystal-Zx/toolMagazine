/**
 * @param {number[]} slices
 * @return {number}
 */
var maxSizeSlices = function (slices) {
  const n = slices.length / 3
  if (n === 1) return Math.max(slices[0], slices[1], slices[2])
  return Math.max(
    getMaxSize(slices.slice(0, -1), n),
    getMaxSize(slices.slice(1), n)
  )
}

var getMaxSize = function (nums, n) {
  const m = nums.length
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 1; i <= m; ++i) {
    for (let j = 1; j <= n; ++j) {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        (i > 1 ? dp[i - 2][j - 1] : 0) + nums[i - 1]
      )
    }
  }
  return dp[m][n]
}

console.log(maxSizeSlices([8, 9, 8, 6, 1, 1]))
// console.log(maxSizeSlices([1, 2, 3, 4, 5, 6]))
