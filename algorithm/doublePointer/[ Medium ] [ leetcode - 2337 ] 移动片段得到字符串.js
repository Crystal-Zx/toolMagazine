/**
 * NOTE: 解法参考[灵神](https://leetcode.cn/problems/move-pieces-to-obtain-a-string/solutions/1658923/nao-jin-ji-zhuan-wan-pythonjavacgo-by-en-9sqt/)
 * @param {string} start
 * @param {string} target
 * @return {boolean}
 */
var canChange = function (start, target) {
  if (start.replaceAll("_", "") !== target.replaceAll("_", "")) return false
  let j = 0
  for (let i = 0; i < start.length; ++i) {
    if (start[i] === "_") continue
    while (target[j] === "_") j++
    // if ((start[i] === "L" && i < j) || (start[i] === "R" && i > j)) return false
    // 简洁写法：(start[i] === "L") === (i < j) 返回 true 需要 === 两侧均为 true 或 均为 false
    if (i !== j && (start[i] === "L") === i < j) return false
    j++
  }
  return true
}
// console.log(canChange("R_L_", "__LR"))
console.log(canChange("_L__R__R_", "L______RR"))
