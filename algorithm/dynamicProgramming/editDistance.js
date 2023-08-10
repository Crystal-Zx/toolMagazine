/** NOTE: 编辑距离问题：也被称为 Levenshtein 距离，指两个字符串之间互相转换的最小修改次数，通常用于在信息检索和自然语言处理中度量两个序列的相似度。 */

// 输入两个字符串 s 和 t，返回将 s 转换为 t 所需的最少编辑步数。你可以在一个字符串中进行三种编辑操作：插入一个字符、删除一个字符、替换字符为任意一个字符。
// dp定义：将 s 的前 i 个字符更改为 t 的前 j 个字符所需的最少编辑步数。
/**
 * 状态方程：dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1
 *  */
function editDistance(s, t) {
  const sLen = s.length,
    tLen = t.length
  const dp = Array.from({ length: sLen + 1 }, () => Array(tLen + 1).fill(0))
  for (let i = 1; i <= sLen; ++i) {
    dp[i][0] = i
  }
  for (let j = 1; j <= tLen; ++j) {
    dp[0][j] = j
  }

  for (let i = 1; i <= sLen; ++i) {
    for (let j = 1; j <= tLen; ++j) {
      if (s[i - 1] === t[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else {
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1
      }
    }
  }
  return dp[sLen][tLen]
}
console.log(editDistance("bag", "pack"))

// -- 进阶版，状态压缩：使用 leftup 来缓存dp[i - 1][j - 1]
function editDistanceComp(s, t) {
  const sLen = s.length,
    tLen = t.length
  const dp = Array(tLen + 1).fill(0)
  for (let j = 1; j <= tLen; ++j) {
    dp[j] = j
  }

  for (let i = 1; i <= sLen; ++i) {
    let leftup = dp[0]
    dp[0] = i
    for (let j = 1; j <= tLen; ++j) {
      const tmp = dp[j]
      if (s[i - 1] === t[j - 1]) dp[j] = leftup
      else {
        dp[j] = Math.min(dp[j], dp[j - 1], leftup) + 1
      }
      leftup = tmp
    }
  }
  return dp[tLen]
}
console.log(editDistanceComp("bag", "pack"))
