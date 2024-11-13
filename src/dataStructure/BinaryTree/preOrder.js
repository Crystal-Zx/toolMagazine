const { TreeNode } = require(".")

/**
 * NOTE: 二叉树前序遍历（递归实现）：中左右
 * @param {*} node 二叉树当前遍历节点（从根节点 root 开始）
 * @returns {Array} res 层序遍历节点值组成的数组
 *
 * 复杂度分析：
 * 时间复杂度：所有节点被访问一次，使用 O(n) 时间，其中 n 为节点数量
 * 空间复杂度：在最差情况下，即树退化为链表时，递归深度达到 n ，系统占用 O(n) 栈帧空间
 */
function preOrder(node, res = []) {
  if (!node) return

  res.push(node.val)
  preOrder(node.left, res)
  preOrder(node.right, res)
  return res
}

// 构建树
const root = new TreeNode(8)
let curr = root
root.left = new TreeNode(4)
root.right = new TreeNode(12)
curr = root.left
curr.left = new TreeNode(2)
curr.right = new TreeNode(6)
curr = root.right
curr.left = new TreeNode(10)
curr.right = new TreeNode(14)

module.exports = {
  demoRoot: root,
}

console.log(preOrder(root))
