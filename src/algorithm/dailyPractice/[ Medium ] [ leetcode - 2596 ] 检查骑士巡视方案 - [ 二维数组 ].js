/**
 * NOTE: [ Medium ] [ leetcode - 2596 ] 检查骑士巡视方案（https://leetcode.cn/problems/check-knight-tour-configuration）
 * @param {number[][]} grid
 * @return {boolean}
 */
var checkValidGridI = function (grid) {
  const g = grid,
    n = grid.length
  if (g[0][0] !== 0) return false

  let nextNum = 1,
    i = 0,
    j = 0
  const choice = [-2, -1, 1, 2]
  findNext: while (nextNum <= n * n - 1) {
    let flag = false
    for (let x of choice) {
      const nextI = i + x
      if (nextI < 0 || nextI >= n) continue
      for (let y of choice) {
        const nextJ = j + y
        if (
          nextJ < 0 ||
          nextJ >= n ||
          Math.abs(Math.abs(x) - Math.abs(y)) !== 1
        )
          continue
        if (g[nextI][nextJ] === nextNum) {
          i = nextI
          j = nextJ
          nextNum++
          flag = true
          continue findNext
        }
      }
    }
    if (!flag) return false
  }
  return true
}

// 优化解法：参考题解（https://leetcode.cn/problems/check-knight-tour-configuration/solutions/2439865/python3javacgotypescript-yi-ti-yi-jie-mo-01if/）
// 思路：我们先用数组 pos 记录骑士访问的每个格子的坐标，然后遍历 pos 数组，检查相邻两个格子的坐标差是否为 (1,2) 或 (2,1) 即可。若不满足，则返回 false。
var checkValidGridII = function (grid) {
  // 判断起点是否符合要求
  if (grid[0][0] !== 0) return

  const n = grid.length
  const pos = Array.from(Array(n * n), () => Array(2).fill(0))
  // 将 grid 中每个位置上的值作为 pos 的下标，将坐标 i,j 放入 pos 对应下标的值上
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      pos[grid[i][j]] = [i, j]
    }
  }

  // 判断相邻点下标差值是否符合要求
  for (let i = 1; i < n * n; ++i) {
    const prev = pos[i - 1]
    const curr = pos[i]
    const dx = Math.abs(prev[0] - curr[0])
    const dy = Math.abs(prev[1] - curr[1])
    // 注意这里 ok 不能单纯判断绝对值差值为1，而必须是直接判断 1 和 2
    const ok = (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
    if (!ok) {
      return false
    }
  }
  return true
}

console.log(
  checkValidGridII([
    [24, 11, 22, 17, 4],
    [21, 16, 5, 12, 9],
    [6, 23, 10, 3, 18],
    [15, 20, 1, 8, 13],
    [0, 7, 14, 19, 2],
  ])
)
console.log(
  checkValidGridII([
    [0, 3, 6],
    [5, 8, 1],
    [2, 7, 4],
  ])
)
