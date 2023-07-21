/**
 * NOTE: 二叉树中序遍历（递归实现）：左中右
 * @param {*} node 二叉树当前遍历节点（从根节点 root 开始）
 * @returns {Array} res 层序遍历节点值组成的数组
 */
function inOrder(node, res = []) {
  if (!node) return

  inOrder(node.left, res)
  res.push(node.val)
  inOrder(node.right, res)
}
