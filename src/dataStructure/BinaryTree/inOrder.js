const { TreeNode } = require(".")

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
  return res
}

const root = new TreeNode(3)
let curr = root
curr.left = new TreeNode(4)
curr.right = new TreeNode(5)
curr = root.left
curr.left = new TreeNode(1)
curr.right = new TreeNode(3)
curr = root.right
curr.right = new TreeNode(1)

console.log(inOrder(root))
