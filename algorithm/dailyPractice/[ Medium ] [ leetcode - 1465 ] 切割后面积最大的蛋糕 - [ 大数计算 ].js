/**
 * [ Medium ] [ leetcode - 1465 ] 切割后面积最大的蛋糕（https://leetcode.cn/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/）
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
var maxArea = function (h, w, horizontalCuts, verticalCuts) {
  const maxH = getMaxSize(horizontalCuts, h)
  const maxW = getMaxSize(verticalCuts, w)
  return Number((BigInt(maxH) * BigInt(maxW)) % BigInt(1e9 + 7)) // ★★★
}

function getMaxSize(cuts, size) {
  cuts.sort((a, b) => a - b)
  const n = cuts.length
  let max = Math.max(cuts[0], size - cuts[n - 1])
  for (let i = 1; i < n; ++i) {
    max = Math.max(max, cuts[i] - cuts[i - 1])
  }
  return max
}

console.log(maxArea(5, 4, [1, 2, 4], [1, 3]))
console.log(maxArea(5, 4, [3, 1], [1]))
console.log(maxArea(5, 4, [3], [3]))
console.log(maxArea(1000000000, 1000000000, [2], [2]))
