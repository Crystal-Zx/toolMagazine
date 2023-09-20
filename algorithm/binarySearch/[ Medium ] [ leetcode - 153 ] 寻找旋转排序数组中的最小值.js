/**
 * [ Medium ] [ leetcode - 153 ] 寻找旋转排序数组中的最小值
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = -1,
    right = nums.length - 1
  let mid
  while (left + 1 < right) {
    mid = (left + right) >> 1
    if (nums[mid] < nums[right]) {
      right = mid
    } else {
      left = mid
    }
  }
  return nums[right]
}

console.log(findMin([1]))
console.log(findMin([2, 1]))
console.log(findMin([3, 4, 5, 1, 2]))
console.log(findMin([11, 13, 15, 17]))
