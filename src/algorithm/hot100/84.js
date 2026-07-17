/**
 * 题目：[ 单调栈 ] 84.柱状图中最大的矩形
 * 日期：26.7.17
 * 解题思路：矩形的高一定是 heights 中的值。枚举 heights[i] 作为矩形的高，求最大宽度。
 *  - 矩形宽度区间：求 heights[i] 左右最近的小于其值的柱子，其下标分别为 l, r；此时矩形的宽度为 [l + 1, r - 1]。
 */

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  heights.push(-1)
  const n = heights.length
  const st = [-1]
  let ans = 0

  for (let r = 0; r < n; r++) {
    const right = heights[r]
    while (st.length > 1 && heights[st[st.length - 1]] >= right) {
      const h = heights[st.pop()]
      ans = Math.max(ans, (r - st[st.length - 1] - 1) * h)
    }
    st.push(r)
  }
  return ans
}

// console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]))
console.log(largestRectangleArea([2, 4]))
