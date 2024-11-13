/**
 * [ Medium ] [ leetcode - 1726 ] 同积元组（https://leetcode.cn/problems/tuple-with-same-product）
 * @param {number[]} nums
 * @return {number}
 */
function factorial(num) {
  var result = 1
  for (var i = 2; i <= num; i++) {
    result *= i
  }
  return result
}
var tupleSameProduct = function (nums) {
  const map = new Map()
  const len = nums.length
  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      const res = nums[i] * nums[j]
      const val = map.get(res) ?? []
      val.push([nums[i], nums[j]])
      map.set(res, val)
    }
  }
  let ans = 0
  map.forEach((value, key) => {
    const n = value.length
    if (n < 2) return
    if (n === 2) ans += 1
    else ans += factorial(n) / (factorial(2) * factorial(n - 2))
  })

  return ans * 8
}

console.log(tupleSameProduct([1, 2, 4, 5, 10]))
