/*
 * 题目：[ 滑动窗口 ] 76.最小覆盖子串
 * 日期：26.7.15
 * 解题思路：基本思路同 438，区别在于本题的窗口合法判断逻辑不一样（基于最终优化版本）。
 *  - less 表示窗口对应子串中有 less 个字母出现次数少于 t，当其值为 0 时，说明找到了能够覆盖 t 的子串，此时可以缩小窗口，找寻最小的合法窗口。
 *  - less 的增减逻辑：
 *    - 枚举窗口右端点时，当前 cnt[s[r].charCodeAt(0)] === 0 说明当前右端点进入窗口后，该字符的数量 ≥ t 中的数量，故 less--
 *    - 缩小窗口左端点时，缩小前 cnt[s[l].charCodeAt(0)] === 0 说明移除左端点后，左端点对应字母在窗口子串中出现次数小于 t，故 less++
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const m = s.length,
    n = t.length
  if (m < n) return ''

  const cnt = Array(123).fill(0)
  let less = 0 // 子串中有 less 个字母出现次数少于 t
  for (let c of t) {
    const idx = c.charCodeAt(0)
    if (!cnt[idx]) less++
    cnt[idx]++
  }

  let ans = [-1, m],
    l = 0
  for (let r = 0; r < m; r++) {
    const idx = s[r].charCodeAt(0)
    cnt[idx]--

    if (!cnt[idx]) less--

    while (!less) {
      // 此时子串中所有 t 中的字母的出现次数均大于 t，即当前子串能够覆盖 t
      if (r - l < ans[1] - ans[0]) {
        ans = [l, r] // 更新答案
      }
      // 右移左端点，缩小窗口
      const lIdx = s[l].charCodeAt(0)
      if (!cnt[lIdx]) less++ // 一定要先判断，再右移左端点
      cnt[lIdx]++
      l++
    }
  }
  return ans[0] < 0 ? '' : s.slice(ans[0], ans[1] + 1)
}

console.log(minWindow('ADOBECODEBANC', 'ABC'))
