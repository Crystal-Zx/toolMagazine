/**
 * NOTE:
 * [ Easy ] [ leetcode - 1475 ] 商品折扣后的最终价格
 * https://leetcode.cn/problems/final-prices-with-a-special-discount-in-a-shop/
 */

// 解题思路：根据题意将本题转换为求 下标为 i 的元素 p[i] 右侧第一个非严格小于值的下标

/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function (prices) {
  const n = prices.length
  const stack = [],
    ans = Array(n).fill(0)
  for (let i = 0; i < n; ++i) {
    while (stack.length && prices[i] <= prices[stack[stack.length - 1]]) {
      const idx = stack.pop()
      ans[idx] = prices[idx] - prices[i]
    }
    stack.push(i)
    ans[i] = prices[i]
  }
  return ans
}
// console.log(finalPrices([10, 1, 1, 6]))
// console.log(finalPrices([1, 2, 3, 4, 5]))
console.log(finalPrices([8, 4, 6, 2, 3]))
