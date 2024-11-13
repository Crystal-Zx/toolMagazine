/* 全排列问题 */

// NOTE: 无相等元素的全排列
function permutationsI(choices) {
  let selected = Array(choices.length).fill(false),
    state = [],
    res = []
  backtrackI(state, choices, res, selected)
  return res
}
function backtrackI(state, choices, res, selected) {
  if (state.length === choices.length) {
    res.push([...state])
    return
  }

  choices.forEach((choice, i) => {
    if (!selected[i]) {
      state.push(choice)
      selected[i] = true
      backtrackI(state, choices, res, selected)
      state.pop()
      selected[i] = false
    }
  })
}
console.log("==> 无相等元素的全排列\n", permutationsI([1, 2, 3]))

// NOTE: 有相等元素的全排列
// 核心思想：
// 1. 在每一轮遍历当前所有选择时需考虑不使用相同数，此时使用 rowSelected 来记录是否有相同数，有则直接剪枝（横向遍历剪枝）<--- 剪除重复的选择
// 2. 在递归中确定 state 的下一个值时，需要考虑当前值是否使用过，而不必考虑是否为相同数（“竖向”遍历剪枝） <--- 剪除排列中的同一元素
function backtrackII(state, choices, res, selected) {
  if (state.length === choices.length) {
    res.push([...state])
    return
  }

  let rowSelected = new Set()
  choices.forEach((choice, i) => {
    if (!rowSelected.has(choice) && !selected.includes(i)) {
      rowSelected.add(choice)
      selected.push(i)
      state.push(choice)
      backtrackII(state, choices, res, selected)
      selected.pop()
      state.pop()
    }
  })
}
function permutationsII(choices) {
  let selected = [],
    state = [],
    res = []
  backtrackII(state, choices, res, selected)
  return res
}
/**
 * 复杂度分析：
 * 1. 时间复杂度：长度为 n 的无相等元素<最差情况下>的全排列种类为 n!，每一种结果值记录需花费 n 的时间，故时间复杂度为 O(n! * n)
 * 2. 空间复杂度：最大递归深度为 n，使用 O(n) 的栈帧空间，selected 使用 O(n) 空间，最多同时存在 n 个 rowSelected ，使用 O(n^2) 空间，故空间复杂度为 O(n ^ 2)
 */
console.log("==> 有相等元素的全排列\n", permutationsII([1, 1, 2]))
