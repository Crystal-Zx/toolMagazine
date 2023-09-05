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
  // if (!root) return ""
  const queue = [root],
    res = []

  while (queue.length) {
    const node = queue.shift()
    if (node) {
      res.push(node.val)
      queue.push(node.left)
      queue.push(node.right)
    } else {
      res.push("X")
    }
  }
  return res.join(",")
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
  const root = new TreeNode(list[0])
  const queue = [root]

  let cursor = 1
  while (cursor < list.length) {
    const node = queue.shift()
    const leftVal = list[cursor]
    const rightVal = list[cursor + 1]

    if (leftVal !== "X") {
      const leftNode = new TreeNode(leftVal)
      node.left = leftNode
      queue.push(leftNode)
    }

    if (rightVal !== "X") {
      const rightNode = new TreeNode(rightVal)
      node.right = rightNode
      queue.push(rightNode)
    }
    cursor += 2
  }
  return root
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const res = serialize(root)
console.log("==> 序列化： ", res)
console.log("==> 反序列化： ", deserialize(res))
