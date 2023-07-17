/**
 * NOTE:
 * [ Medium ] [ leetcode - 1124 ] 表现良好的最长时间段
 * https://leetcode.cn/problems/longest-well-performing-interval/
 */

// 关于如何成为左端点：
// 从前往后遍历s时，只有小于前面所有的值时才有可能成为左端点
// 举个例子：
// 假设有s[j]为左端点，则一定有 大于j的k 使得 s[k] > s[j]。此时如果有 小于j的一个i值 使得 s[j] < s[i]，则会使 s[j] < s[k] 成立，那么s[i]应替代s[j]成为左端点，假设不成立。故，若一个 s[left] 能成为左端点， 它一定是遍历过的所有值中最小的。

// 前置知识：
// nums[]下标从[i,j)的元素和 = s[j] - s[i]（s[idx]表示数组下标为idx的元素的前缀和，即从0到下标为idx-1的数组元素之和）

// 题意转换：
// 1. 把劳累的一天视作1，不劳累的视为-1
// 2. 计算 hours 的最长子数组，使得数组元素和大于0
// 3. 即是说，找到两个下标 left, right，使得 s[right] - s[left] > 0，且尽量保证right取最大，left取最小
// 4. 最后返回最大的一组 right - left 作为本题的答案

// 主体思路：
// 1. 遍历初始数组 hours 计算「前缀和」并同时更新 st 栈（st栈中存放的是所有可能成为最长子数组左端点的值的下标）
// 2. 找出所有可能的左端点后，我们需要找出右端点（右端点需要满足：① 大于左端点；② 保持右端点下标值最大）

/**
 * 方法一：两次遍历，单调栈找出左端点，然后倒序遍历前缀和数组找出右端点
 * @param {number[]} hours
 * @return {number}
 */
// var longestWPI1 = function (hours) {
//   let ans = 0
//   const s = [] // hours 的前缀和数组
//   const st = [] // 存放所有可能成为左端点的s值的下标
//   s[0] = 0
//   st[0] = 0
//   // 计算前缀和数组并更新可能得左端点值（单调递减栈）
//   for (let i = 1; i <= hours.length; ++i) {
//     // 注意这里需要 i <= hours.length
//     s[i] = s[i - 1] + (hours[i - 1] > 8 ? 1 : -1)
//     if (s[i] < s[st[st.length - 1]]) st.push(i)
//   }
//   // 找右端点的可能值。由于我们想找最大的右端点值（下标取最大），故从后往前遍历 s
//   for (let i = s.length; i > 0; --i) {
//     // 右端点下标最小值为1，所以 i > 0（不取0）
//     while (st.length && s[i] > s[st[st.length - 1]]) {
//       ans = Math.max(ans, i - st.pop())
//     }
//   }
//   return ans
// }

/**
 * 方法二：利用前缀和的连续性及数组项均为1、-1（使连续项之间差值均为1）特性
 * @param {number[]} hours
 * @return {number}
 */
var longestWPI2 = function (hours) {
  const map = new Map()
  const n = hours.length
  const s = Array(n + 1)
  let ans = 0
  s[0] = 0
  map.set(0, 0)
  for (let i = 1; i <= n; ++i) {
    let left
    s[i] = s[i - 1] + (hours[i - 1] > 8 ? 1 : -1)
    if (!map.get(s[i])) map.set(s[i], i)
    if (map.get(s[i] - 1) === undefined) continue
    left = s[i] > 0 ? 0 : map.get(s[i] - 1)
    ans = Math.max(ans, i - left)
  }
  return ans
}
console.log(longestWPI2([6, 6, 9])) // 1
// console.log(longestWPI2([9, 9, 6, 0, 6, 6, 9])) // 3
