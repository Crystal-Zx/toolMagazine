/**
 * 给定一个正整数 n ，将其切分为至少两个正整数的和，求切分后所有整数的乘积最大是多少。
 * @param {Number} n 待切分的正整数
 */
function maxProductCutting(n) {
  // 边界情况（至少切分成两个正整数之和）
  if (n <= 3) return 1 * (n - 1)

  // n = 3 * a + b
  let a = Math.floor(n / 3)
  let b = n % 3

  if (b === 1) {
    // 最后一个 3 需要与余数 1 一起拆分成 2 + 2（因为 2 * 2 > 1 * 3）
    return Math.pow(3, a - 1) * 2 * 2
  }
  // b === 0 或 b === 2 时都无需处理
  return Math.pow(3, a)
}
console.log(maxProductCutting(10))
