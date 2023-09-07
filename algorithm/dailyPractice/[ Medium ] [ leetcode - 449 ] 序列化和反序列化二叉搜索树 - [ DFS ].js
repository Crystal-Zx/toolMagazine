const { TreeNode } = require("../../dataStructure/BinaryTree/index")

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const root = new TreeNode(8)
root.left = new TreeNode(4)
root.right = new TreeNode(12)
let curr = root.left
curr.left = new TreeNode(2)
curr = root.right
curr.left = new TreeNode(10)
curr.right = new TreeNode(14)

/**
 * NOTE: 解题思路：
 * 序列化：利用先序进行序列化
 * 反序列化：将二叉搜索树的先序排列进行升序排序，即是该二叉搜索树的中序排列。已知，通过先序和中序两个序列可以确定一棵二叉树。
 *  */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if(!root) return ""

  const left = serialize(root.left)
  const right = serialize(root.right)

  return root.val + (left ? ("," + left) : "") + (right ? ("," + right) : "")
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (!data) return null
  const preList = data.split(",")
  const inList = [...preList].sort((a, b) => a - b)  // asc
  
  
  return dfs(preList, inList)
  function dfs(preList, inList) {
    if(!preList.length) return null
    
    const rootVal = preList[0]
    const idx = inList.indexOf(rootVal)
    
    const root = new TreeNode(rootVal)
    root.left = dfs(preList.slice(1, idx + 1), inList.slice(0, idx))
    root.right = dfs(preList.slice(idx + 1), inList.slice(idx + 1))

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
