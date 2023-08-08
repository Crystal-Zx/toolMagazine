/**
 * NOTE: N皇后问题：根据国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。给定 n 个皇后和一个 n * n 大小的棋盘，寻找使得所有皇后之间无法相互攻击的摆放方案。
 * @param {Number} n n个皇后放置于 n * n 的棋盘上
 */
function nQueens(n) {
  const state = Array.from({ length: n }, () => Array(n).fill("#")) // “#” 表示空位，“Q”表示皇后
  const diags1 = Array(2 * n - 1).fill(0) // 主对角线（左上到右下），0 表示该条对角线上不存在皇后，1 表示存在
  const diags2 = Array(2 * n - 1).fill(0) // 次对角线（右上到左下）
  // NOTE: 采用逐行放置皇后策略，根据题意，每一行有且仅有一个皇后，故此处不用记录每行的状态。
  const cols = Array(n).fill(0) // 列上是否有皇后

  res = []
  backTrack(state, 0, n, diags1, diags2, cols, res)
  return res
}

function backTrack(state, row, n, diags1, diags2, cols, res) {
  if (row === n) {
    res.push(state.map(row => row.slice()))
    return
  }

  for (let col = 0; col < n; ++col) {
    let d1 = row - col + n - 1,
      d2 = row + col
    // 剪枝：对角线及列剪枝，不允许这三条线上放置过皇后
    if (!diags1[d1] && !diags2[d2] && !cols[col]) {
      state[row][col] = "Q"
      diags1[d1] = diags2[d2] = cols[col] = true
      backTrack(state, row + 1, n, diags1, diags2, cols, res)
      state[row][col] = "#"
      diags1[d1] = diags2[d2] = cols[col] = false
    }
  }
}

console.log(nQueens(4))

/**
 * 复杂度分析：
 * 1. 时间复杂度：按照逐行放置策略，从第一行到最后一行考虑列约束的前提下，分别有 n、n - 1、n - 2 ... 1 种放置方式，故时间复杂度在仅考虑列剪枝的情况下为 O(n!)，但我们又加入了对角线剪枝，能大幅减少搜索空间，故实际情况会远远优于 O(n!)
 * 2. 空间复杂度：state 使用 O(n^2) 大小空间，diags1、diags2 和 cols 各使用 O(n) 大小空间，递归最大使用 O(n) 栈帧空间，故空间复杂度为 O(n^2)
 */
