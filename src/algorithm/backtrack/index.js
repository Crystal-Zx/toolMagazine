/**
 * 回溯算法框架（伪代码）
 * @param {*} state 问题的当前状态（状态表示问题在某一时刻的情况，包括已经做出的选择）
 * @param {*} choices 当前状态下可以做出的选择
 * @param {*} res
 */
function backtrack(state, choices, res) {
  // 判断当前状态是否符合题解
  if (isSolution(state)) {
    // 记录题解
    recordSolution(state, res)
    // 停止继续搜索
    return
  }

  // 遍历当前所有选择
  for (let choice of choices) {
    // 剪枝：判断当前选择是否合法
    if (isValid(choice)) {
      // 尝试：做出选择，更新状态
      makeChoice(state, choice)
      // 以当前选择作为下一个 state 进一步尝试
      backtrack(state, choices, res)
      // 回退：撤销选择，回到上一步的状态
      undoChoice(state, choice)
    }
  }
}

// TEST: 在二叉树中搜索所有值为 7 的节点，请返回根节点到这些节点的路径，并要求路径中不包含值为 3 的节点。
function preorder(state, choices, res) {
  if (!!state.length && state[state.length - 1]?.val === 7) {
    res.push([...path])
  }

  for (let choice of choices) {
    // 当前节点非过叶节点 或者 choice 节点值不为 3 时合法
    if (choice !== null && choice.val !== 3) {
      state.push(choice)
      preorder(state, [choice.left, choice.right], res)
      state.pop()
    }
  }
}
