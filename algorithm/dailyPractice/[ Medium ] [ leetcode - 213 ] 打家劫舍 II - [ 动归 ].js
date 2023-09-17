/**
 * @param {number[]} nums
 * @return {number}
 */
// dp[n + 1] = Math.max(dp[n], dp[n - 1] + nums[i])
var rob = function (nums) {
  const n = nums.length
  if (n <= 1) return nums[0]
  return Math.max(fn(nums.slice(1)), fn(nums.slice(0, nums.length - 1)))
  function fn(nums) {
    let prev = 0,
      curr = 0,
      tmp
    for (let num of nums) {
      tmp = curr
      curr = Math.max(curr, prev + num)
      prev = tmp
    }
    return curr
  }
}

console.log(rob([1]))
// console.log(rob([2, 3, 2]))
// console.log(rob([1, 2, 3, 1]))
