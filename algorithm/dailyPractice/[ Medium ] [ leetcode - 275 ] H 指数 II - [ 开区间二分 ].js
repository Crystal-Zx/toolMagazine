/**
 * [ Medium ] [ leetcode - 275 ] H 指数 II（https://leetcode.cn/problems/h-index-ii）
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  const n = citations.length
  let left = 0,
    right = n + 1 // (0, n + 1)
  while (left + 1 < right) {
    const mid = (left + right) >> 1
    if (citations[n - mid] >= mid) left = mid // (mid, right)
    else right = mid
  }
  return left
}

console.log(hIndex([3, 4, 12, 24, 27, 59]))
