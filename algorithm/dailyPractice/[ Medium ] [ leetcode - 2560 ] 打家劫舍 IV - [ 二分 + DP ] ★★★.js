/**
 * [ Medium ] [ leetcode - 2560 ] 打家劫舍 IV（https://leetcode.cn/problems/house-robber-iv/）
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minCapability = function (nums, k) {
  let left = 0,
    right = Math.max(...nums)
  while (left + 1 < right) {
    const mid = (left + right) >> 1
    if (check(mid)) {
      right = mid
    } else {
      left = mid
    }
  }
  return right

  function check(mx) {
    let f0 = 0,
      f1 = 0
    for (const x of nums) {
      if (x > mx) {
        f0 = f1
      } else {
        ;[f0, f1] = [f1, Math.max(f1, f0 + 1)]
      }
    }
    return f1 >= k
  }
}

console.log(minCapability([2, 7, 9, 3, 1], 2))
