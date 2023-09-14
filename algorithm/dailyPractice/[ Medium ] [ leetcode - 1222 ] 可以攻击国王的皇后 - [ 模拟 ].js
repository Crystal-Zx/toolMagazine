/**
 * NOTE: [ Medium ] [ leetcode - 1222 ] 可以攻击国王的皇后（https://leetcode.cn/problems/queens-that-can-attack-the-king/）
 * @param {number[][]} queens
 * @param {number[]} king
 * @return {number[][]}
 */
var queensAttacktheKing = function (queens, king) {
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ]
  const isQueen = Array.from(Array(8), () => Array(8).fill(false))
  for (let [x, y] of queens) {
    isQueen[x][y] = true
  }

  const ans = []
  for (let [dx, dy] of directions) {
    let x = king[0] + dx,
      y = king[1] + dy
    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      if (isQueen[x][y]) {
        ans.push([x, y])
        break
      }
      x += dx
      y += dy
    }
  }
  return ans
}

console.log(
  queensAttacktheKing(
    [
      [0, 1],
      [1, 0],
      [4, 0],
      [0, 4],
      [3, 3],
      [2, 4],
    ],
    [0, 0]
  )
)
