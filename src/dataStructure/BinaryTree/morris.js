const buildTree = require('./buildBinaryTree')

/**
 * NOTE: Morris 遍历：二叉树的前中后序遍历
 * 以下述二叉树为例：
 *     4
 *    / \
 *   2   5
 *  / \
 * 1   3
 * - 前序（根 - 左 - 右）：[4, 2, 1, 3, 5]
 * - 中序（左 - 根 - 右）：[1, 2, 3, 4, 5]
 * - 后序（左 - 右 - 根）：[1, 3, 2, 5, 4]
 */

// NOTE: 前序 + 中序答案建树：
const tree = buildTree([4, 2, 1, 3, 5], [1, 2, 3, 4, 5])

/**
 *
 * @param {TreeNode} root 二叉树根节点
 * @returns {Array<number>} 二叉树前序遍历答案
 */
function preorder(root) {
  // 根 - 左 - 右
  const ans = []

  while (root) {
    if (root.left) {
      // 左子树存在时，查找当前节点的前驱节点
      let prev = root.left
      while (prev.right && prev.right !== root) {
        prev = prev.right
      }

      if (!prev.right) {
        // 当前节点左子树尚未遍历
        ans.push(root.val) // 记录当前节点答案（作为当前子树的「根」节点）

        prev.right = root // 建立当前节点与左子树遍历顺序最后一个节点之间的「线索」，即将当前节点与其遍历顺序的前驱节点通过 right 连接
        root = root.left // 遍历左子树
        continue
      }

      // 当前节点左子树已遍历完成
      prev.right = null // 释放「线索」连接，恢复二叉树原样
    } else {
      // 左子树不存在时
      ans.push(root.val)
    }
    // 当前节点左子树已遍历完成 || 左子树不存在时 ==> 遍历右子树
    root = root.right
  }

  return ans
}
console.log('🚀 ~ preorder ~ ans:', preorder(tree))

/**
 *
 * @param {TreeNode} root 二叉树根节点
 * @returns {Array<number>} 二叉树中序遍历答案
 */
function inorder(root) {
  // 左 - 根 - 右
  const ans = []

  while (root) {
    if (root.left) {
      // 左子树存在时，查找当前节点的前驱节点
      let prev = root.left
      while (prev.right && prev.right !== root) {
        prev = prev.right
      }

      if (!prev.right) {
        // 当前左子树尚未遍历
        prev.right = root // 建立线索连接
        root = root.left
        continue
      }

      // 当前左子树遍历完成
      prev.right = null
    }
    // 左子树不存在 || 当前左子树遍历完成
    ans.push(root.val) // 记录根节点答案
    root = root.right
  }

  return ans
}
console.log('🚀 ~ inorder ~ ans:', inorder(tree))

/**
 *
 * @param {TreeNode} root 二叉树根节点
 * @returns {Array<number>} 二叉树后序遍历答案
 */
function postorder(root) {
  // 左 - 右 - 根 ==> 根 - 右 - 左 + 结果 reverse
  const ans = []

  while (root) {
    // 存在右子树时
    if (root.right) {
      // 查找当前节点在「根 - 右 - 左」遍历顺序中的前驱节点：其右子树最左端叶节点
      let prev = root.right
      while (prev.left && prev.left !== root) {
        prev = prev.left
      }

      if (!prev.left) {
        // 右子树尚未遍历
        ans.push(root.val) // 记录当前根节点值
        prev.left = root //  建立线索
        root = root.right // 遍历右子树
        continue
      }
      // 右子树遍历完成
      prev.left = null // 释放线索连接，恢复二叉树现场
    } else {
      // 右子树不存在
      ans.push(root.val) // 记录当前根节点值
    }
    // 右子树不存在 || 右子树遍历完成：遍历左子树
    root = root.left
  }

  return ans.reverse()
}
console.log('🚀 ~ postorder ~ ans:', postorder(tree))
