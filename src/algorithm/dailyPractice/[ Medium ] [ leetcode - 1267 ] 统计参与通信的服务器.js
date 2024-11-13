/**
 * [ Medium ] [ leetcode - 1267 ] 统计参与通信的服务器（https://leetcode.cn/problems/count-servers-that-communicate/description/）
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function (grid) {
  const rowLen = grid.length,
    colLen = grid[0].length
  let row = Array(rowLen).fill(0)
  let col = Array(colLen).fill(0)
  for (let i = 0; i < rowLen; ++i) {
    for (let j = 0; j < colLen; ++j) {
      if (grid[i][j]) {
        row[i]++
        col[j]++
      }
    }
  }

  let ans = 0
  for (let i = 0; i < rowLen; ++i) {
    for (let j = 0; j < colLen; ++j) {
      if (grid[i][j] && (row[i] > 1 || col[j] > 1)) ans++
    }
  }
  return ans
}

console.log(
  countServers([
    [1, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ])
)
