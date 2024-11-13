/**
 * 子集和问题
 */

// NOTE:
/**
 * 无重复元素的情况
 * 给定一个正整数数组 nums 和一个目标正整数 target ，请找出所有可能的组合，使得组合中的元素和等于 target 。给定数组无重复元素，每个元素可以被选取多次。请以列表形式返回这些组合，列表中不应包含重复组合。
 */
function subsetSumI(nums, target) {
  let res = [],
    state = []
  // 优化策略一：先对数组排序，在 子集和 大于 target 时及时剪枝
  nums.sort((a, b) => a - b)
  backtrackI(state, nums, target, 0, res)
  return res
}
function backtrackI(state, choices, target, st, res) {
  if (target === 0) {
    res.push([...state])
    return
  }

  for (let i = st; i < choices.length; ++i) {
    if (target - choices[i] < 0) break
    state.push(choices[i])
    backtrackI(state, choices, target - choices[i], i, res)
    state.pop()
  }
}
console.log("==> 无重复元素的情况\n", subsetSumI([3, 4, 5], 9))

/**
 * NOTE: 有重复元素的情况
 * 给定一个正整数数组 nums 和一个目标正整数 target ，请找出所有可能的组合，使得组合中的元素和等于 target 。给定数组可能包含重复元素，每个元素只可被选择一次。请以列表形式返回这些组合，列表中不应包含重复组合。
 */
function subsetSumII(nums, target) {
  let res = [],
    state = []
  // 优化策略一：先对数组排序，在 子集和 大于 target 时及时剪枝（升序排列）
  nums.sort((a, b) => a - b)
  backtrackII(state, nums, target, 0, res)
  return res
}
function backtrackII(state, choices, target, st, res) {
  if (target === 0) {
    res.push([...state])
    return
  }

  // 剪枝一：从 st 开始遍历，避免生成重复子集
  // 剪枝二：从 st 开始遍历，避免选择到同一元素
  for (let i = st; i < choices.length; ++i) {
    // 剪枝三：当前元素使得 state 和大于 target，直接剪掉后续所有选择（因为后面的元素比当前元素更大）
    if (target - choices[i] < 0) break
    // 剪枝四：过滤掉与前一轮值相同的元素
    if (i > st && choices[i] === choices[i - 1]) continue
    state.push(choices[i])
    backtrackII(state, choices, target - choices[i], i + 1, res)
    state.pop()
  }
}
console.log("==> 有重复元素的情况\n", subsetSumII([4, 4, 5], 9))
console.log("==> 有重复元素的情况\n", subsetSumII([3, 3, 3], 9))
