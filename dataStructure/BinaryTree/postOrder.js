/**
 * NOTE: 二叉树后序遍历（递归实现）：左右中
 * @param {*} node 二叉树当前遍历节点（从根节点 root 开始）
 * @returns {Array} res 层序遍历节点值组成的数组
 */
function postOrder(node, res = []) {
  if (!node) return

  postOrder(node.left, res)
  postOrder(node.right, res)
  res.push(node.val)
}
