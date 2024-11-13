const { TreeNode } = require("../../dataStructure/BinaryTree/index")

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
let curr = root
curr = curr.right
curr.left = new TreeNode(4)
curr.right = new TreeNode(5)

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (!root) {
    return "X"
  }
  const left = serialize(root.left)
  const right = serialize(root.right)
  return root.val + "," + left + "," + right
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data === "X") return null
  const list = data.split(",")
  let idx = 0
  return buildTree()

  function buildTree() {
    const rootVal = list[idx++]
    if (rootVal === "X") return null

    const root = new TreeNode(rootVal)
    root.left = buildTree()
    root.right = buildTree()

    return root
  }
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const res = serialize(root)
console.log("==> 序列化： ", res)
console.log("==> 反序列化： ", deserialize(res))
