/*
 * 题目：[ 滑动窗口 ] 438.找到字符串中所有字母异位词
 * 日期：26.7.14
 * 解题思路：
 *  - 定长滑窗：滑窗大小为 p.length，当窗口形成且窗口中各字母出现次数等于 p 中各字母次数时，找到答案。
 *  - 不定长滑窗：枚举滑窗右端点 r，记录其在滑窗中的出现次数，当右端点出现次数大于 p 中出现次数时，右移左端点（缩小滑窗）。当滑窗大小与 p 长度相等时，找到答案。
 *    - 解析：滑窗在右端点次数大于 p 次数时不合法，缩小窗口 ==> 滑窗内字母在当前窗口内的子串中，出现次数均 ≤ p 中出现次数，故当滑窗大小等于 p 长度时，可证明出两者各字母出现次数相等，是异位词。
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams1 = function (s, p) {
  const n = s.length,
    k = p.length
  const cntP = Array(26).fill(0),
    cntS = Array(26).fill(0)
  for (let c of p) {
    cntP[getIdx(c)]++
  }

  const ans = []

  for (let r = 0; r < n; r++) {
    cntS[getIdx(s[r])]++
    if (r < k - 1) continue

    // 滑窗形成
    let l = r - k + 1
    if (cntP.toString() === cntS.toString()) {
      ans.push(l)
    }
    cntS[getIdx(s[l])]--
  }
  return ans
}

var findAnagrams2 = function (s, p) {
  const n = s.length,
    k = p.length
  const cntP = Array(26).fill(0),
    cntS = Array(26).fill(0)
  for (let c of p) {
    cntP[getIdx(c)]++
  }

  const ans = []
  let l = 0
  for (let r = 0; r < s.length; r++) {
    // 枚举
    cntS[getIdx(s[r])]++

    while (cntS[getIdx(s[r])] > cntP[getIdx(s[r])]) {
      cntS[getIdx(s[l++])]--
    }
    if (r - l + 1 === k) {
      ans.push(l)
    }
  }
  return ans
}

// 最终优化版
var findAnagrams21 = function (s, p) {
  const n = s.length,
    k = p.length
  if (n < k) return [] // 特判

  const cntP = Array(26).fill(0)
  for (let c of p) {
    cntP[getIdx(c)]++
  }

  const ans = []
  let l = 0
  for (let r = 0; r < n; r++) {
    const c = getIdx(s[r])
    // 枚举
    cntP[c]--

    while (cntP[c] < 0) {
      cntP[getIdx(s[l++])]++
    }
    if (r - l + 1 === k) {
      ans.push(l)
    }
  }
  return ans
}

const getIdx = char => {
  return char.charCodeAt(0) - 'a'.charCodeAt(0)
}

console.log(findAnagrams2('cbaebabacd', 'abc'))
