/**
 * 算是双指针解法吧，相当于求连续0，但要额外处理首尾的情况
 * 空间 O(1)，时间 O(n)
 * @param {number[]} seats
 * @return {number}
 */
var maxDistToClosest = function (seats) {
  let left = 0,
    max = 0
  for (let i = 1, len = seats.length; i < len; ++i) {
    if (!seats[i] && i !== len - 1) continue

    if (!seats[left] || !seats[i]) max = Math.max(max, i - left)
    else {
      max = Math.max(max, Math.floor((i - left) / 2))
    }
    left = i
  }
  return max
}
console.log(maxDistToClosest([0, 1, 0, 1, 0]))
// console.log(maxDistToClosest([1, 0, 0, 1]))
// console.log(maxDistToClosest([1, 0, 0, 0, 1, 0, 1]))
// console.log(maxDistToClosest([1, 0, 0, 0]))
// console.log(maxDistToClosest([0, 1]))
