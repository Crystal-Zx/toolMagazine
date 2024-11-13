/**
 * [ Easy ] [ leetcode - 2525 ] 根据规则将箱子分类
 * （https://leetcode.cn/problems/categorize-box-according-to-criteria/）
 * @param {number} length
 * @param {number} width
 * @param {number} height
 * @param {number} mass
 * @return {string}
 */
var categorizeBox = function (length, width, height, mass) {
  let i = 0 // 初始时对应 Neither

  const maxV = Math.pow(10, 9)
  const v = length * width * height
  if (length >= 10000 || width >= 10000 || height >= 10000 || v >= maxV) {
    i |= 1 // i = 0 时 i |= 1 --> 1, 对应 Bulky
  }
  // i = 0 时 i |= 2 --> 2, 对应 Heavy；i = 1 时 i |= 2 --> 3, 对应 Both
  if (mass >= 100) i |= 2
  return ["Neither", "Bulky", "Heavy", "Both"][i]
}

console.log(categorizeBox(10000, 1, 1, 1))
console.log(categorizeBox(1000, 35, 700, 300))
console.log(categorizeBox(200, 50, 800, 50))
