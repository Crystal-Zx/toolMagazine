/**
 * [ Easy ] [ leetcode - 2652 ] 倍数求和（https://leetcode.cn/problems/sum-multiples）
 * 「TIPS」此题需要注意 3 5 7 的公约数处理
 * 解题思路：「方法一」等差求和+容斥原理。空间O(1)， 时间O(1)
 * @param {number} n
 * @return {number}
 */
var sumOfMultiples = function (n) {
  // f(x) 表示在 [1, n] 中能被 x 整除的所有数之和
  const f = x => {
    const m = Math.floor(n / x)
    return ((x + m * x) * m) >> 1
  }
  return f(3) + f(5) + f(7) - f(3 * 5) - f(3 * 7) - f(5 * 7) + f(3 * 5 * 7)
}
console.log(sumOfMultiples(15))
