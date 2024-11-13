function swap(nums, i, j) {
  const tmp = nums[i]
  nums[i] = nums[j]
  nums[j] = tmp
}

module.exports = swap
