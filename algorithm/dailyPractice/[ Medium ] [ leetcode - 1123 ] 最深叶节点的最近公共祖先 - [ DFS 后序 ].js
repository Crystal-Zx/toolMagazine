// const { TreeNode } = require("../../dataStructure/BinaryTree/index")
/**
 * NOTE: [ Medium ] [ leetcode - 1123 ] 最深叶节点的最近公共祖先（https://leetcode.cn/problems/lowest-common-ancestor-of-deepest-leaves）
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const buildTree = require("../../dataStructure/BinaryTree/buildBinaryTree")

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function (root) {
  let ans
  let maxDepth = -1
  dfs(root, 0)
  return ans

  function dfs(node, depth) {
    if (!node) {
      maxDepth = Math.max(maxDepth, depth)
      return depth
    }

    const leftDepth = dfs(node.left, depth + 1)
    const rightDepth = dfs(node.right, depth + 1)

    if (leftDepth === rightDepth && leftDepth === maxDepth) {
      ans = node
    }

    return Math.max(leftDepth, rightDepth)
  }
}

// TEST: 建树
const preorder = [3, 5, 6, 2, 7, 4, 1, 0, 8]
const inorder = [6, 5, 7, 2, 4, 3, 0, 1, 8]
const root = buildTree(preorder, inorder)
// console.log(root)
console.log(lcaDeepestLeaves(root))
