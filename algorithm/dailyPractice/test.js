const { TreeNode } = require("../../dataStructure/BinaryTree/index")
// const levelOrder = require("../../dataStructure/BinaryTree/levelOrder")
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const root = []
const root1 = new TreeNode(1)
root1.left = null
root1.right = new TreeNode(2)

function levelOrder(root) {
  const queue = [],
    res = []
  if (!root) return res

  queue.push(root)
  while (queue.length) {
    const node = queue.shift()
    if (!node) {
      res.push(null)
    } else {
      res.push(node.val)
      queue.push(node.left)
      queue.push(node.right)
    }
  }
  return res
}
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const res = levelOrder(root)
  return "[" + res.toString() + "]"
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const vals = data.slice(1, -1).split(",")
  if (!vals[0]) return null
  const root = new TreeNode(vals[0])
  let curr = root
  let idx = 1
  while (idx < vals.length) {
    curr.left = new TreeNode(Number(vals[idx]))
    curr.right = vals[idx + 1] ? new TreeNode(Number(vals[idx + 1])) : null
    curr = curr.left
    idx += 2
  }
  return root
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const res = serialize(root1)
console.log("==> 序列化： ", res)
console.log("==> 反序列化： ", deserialize(res))
