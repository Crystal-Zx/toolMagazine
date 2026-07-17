/*
 * 题目：[ 回溯 ] 90.子集 II
 * 日期：26.7.16
 * 解题思路：
 *  - 选与不选：在不选 nums[i] 时要跳过后续所有相同的值（因为值相同时「选 nums[i] 不选 nums[i+1」和「不选 nums[i] 选 nums[i + 1]」是重复的）
 *  - 枚举选哪个：
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup1 = function (nums) {
  const n = nums.length
  const ans = [],
    path = [],
    onPath = Array(n).fill(false)

  function dfs(i, path = []) {
    if (i === n) {
      ans.push([...path])
      return
    }

    // 选 i
    onPath[i] = true
    path.push(nums[i])
    dfs(i + 1, path)
    path.pop()
    onPath[i] = false

    // 不选 i
    if (nums[i] !== nums[i - 1] || !onPath[i - 1]) {
      dfs(i + 1, path)
    }
  }

  dfs(0)
  return ans
}

var subsetsWithDup2 = function (nums) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  const ans = [],
    path = []

  function dfs(i) {
    if (i === n) {
      ans.push([...path])
      return
    }

    // 选 i
    const x = nums[i]
    path.push(x)
    dfs(i + 1)
    path.pop()

    // 不选 i，后续与 nums[i] 相同的值都要跳过
    let j = i + 1
    while (nums[i] === nums[j]) j++
    dfs(j)
  }

  dfs(0)
  return ans
}

var subsetsWithDup3 = function (nums) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  const ans = [],
    path = []

  // 在 [i,n-1] 中选一个 nums[j]
  // 注意选 nums[j] 意味着 [i,j-1] 中的数都没有选！！！
  function dfs(i) {
    ans.push([...path])

    for (let j = i; j < n; j++) {
      const x = nums[j]
      // 注意：若 j > i 说明 nums[j - 1] 没有选（当前在横向轮次，不是从 dfs(i - 1）纵向轮次过来的
      if (j > i && nums[j] === nums[j - 1]) continue

      path.push(x)
      dfs(j + 1)
      path.pop()
    }
  }

  dfs(0)
  return ans
}

console.log(subsetsWithDup3([1, 2, 2]))
