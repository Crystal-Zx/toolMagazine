/**
 * [ Medium ] [ leetcode - 2698 ] 求一个整数的惩罚数
 * （https://leetcode.cn/problems/find-the-punishment-number-of-an-integer）
 * @param {number} n
 * @return {number}
 */
// NOTE: 回溯（n = 91 时有点问题，待检查）
var punishmentNumber1 = function (n) {
  let ans = 0
  for (let i = 1; i <= n; ++i) {
    dfs((i * i).toString(), 0, 0, i)
  }
  return ans
  function dfs(numsStr, ed, sum, target) {
    if (sum + Number(numsStr.slice(ed)) === target && ed === numsStr.length) {
      // console.log(target)
      ans += target * target
      return
    }

    for (let i = ed + 1; i <= numsStr.length; ++i) {
      const num = Number(numsStr.slice(ed, i))
      if (sum + num > target) break
      dfs(numsStr, i, sum + num, target)
    }
  }
}

// NOTE: 方法二 递归
function check(t, x) {
  if (t === x) return true
  let d = 10
  while (t >= d && t % d <= x) {
    if (check(Math.floor(t / d), x - (t % d))) return true
    d *= 10
  }
  return false
}
var punishmentNumber = function (n) {
  let ans = 0
  for (let i = 1; i <= n; ++i) {
    if (check(i * i, i)) ans += i * i
  }
  return ans
}
// console.log(punishmentNumber(10)) // 182
// console.log(punishmentNumber(37)) // 1478
console.log(punishmentNumber(91)) // 21533
