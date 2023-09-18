const { TreeNode } = require("../../dataStructure/BinaryTree")
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  return Math.max(...dfs(root))
  function dfs(node) {
    if (!node) return [0, 0]
    const left = dfs(node.left)
    const right = dfs(node.right)
    return [
      left[1] + right[1] + node.val,
      Math.max(...left) + Math.max(...right),
    ]
  }
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
console.log(rob(root))
