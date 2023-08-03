const { TreeNode } = require("../../dataStructure/BinaryTree")

// NOTE: 根据前序遍历和中序遍历结果数组还原二叉树，并返回根节点
/**
 * 递归构建每一个子树并返回给它的根节点
 * @param {Number[]} preorder 前序遍历节点值数组
 * @param {Number[]} inorder 中序遍历节点值数组
 * @param {Map} hmap inorder 索引与值的哈希映射表
 * @param {*} i 当前树在 preorder 中的索引
 * @param {*} l 当前树在 inorder 中的索引左端点（包含）
 * @param {*} r 当前树在 inorder 中的索引右端点（包含）
 * @returns 当前树根节点
 */
function dfs(preorder, inorder, hmap, i, l, r) {
  if (l > r) return null
  // const m = inorder.indexOf(preorder[i])
  const m = hmap.get(preorder[i])
  const root = new TreeNode(preorder[i])
  root.left = dfs(preorder, inorder, hmap, i + 1, l, m - 1)
  root.right = dfs(preorder, inorder, hmap, i + 1 + (m - l), m + 1, r)
  return root
}

// TEST:
const preorder = [3, 9, 2, 1, 7]
const inorder = [9, 3, 1, 2, 7]
console.log(buildTree(preorder, inorder))

function buildTree(preorder, inorder) {
  const hmap = new Map()
  // 使用 hashMap 提前存储 inorder 中索引值与值的映射，降低 m 的计算时间
  for (let i = 0; i < inorder.length; ++i) {
    hmap.set(inorder[i], i)
  }
  return dfs(preorder, inorder, hmap, 0, 0, inorder.length - 1)
}

/**
 * 复杂度分析：
 * 1. 时间复杂度：每一个节点初始化（执行一个dfs函数）花费 O(1) 的时间，一共 n 个节点，故时间复杂度为 O(n)
 * 2. 空间复杂度：哈希表使用 O(n) 空间，当树退化为链表时消耗 O(n) 栈帧空间，最佳情况下是 O(logn)；总体来说是 O(n)
 */
