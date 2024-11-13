// NOTE: 普通二叉树节点
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/** ---------------------------------------------------------- */
// NOTE: 平衡二叉搜索树节点
class AVLTreeNode {
  constructor(val, left, right, height) {
    this.val = val === undefined ? 0 : val
    this.height = height === undefined ? 0 : height // 额外的属性，记录当前「节点高度（叶节点到当前节点的边数）」
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
  // 工具函数：获取节点高度
  // 注意：叶节点高度为 0，空节点高度为 -1
  height(node) {
    return node === null ? -1 : node.height
  }
  #updateHeight(node) {
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1
  }
  getBalanceFactor(node) {
    return node === null ? 0 : this.height(node.left) - this.height(node.right)
  }

  /**
   * 右旋以 node 为根节点的子树，已重新成为平衡树
   * @param {AVLTreeNOde} node 失衡的节点（balanceFactor > 1）
   */
  #rightRotate(node) {
    const child = node.left
    const grandChild = child.right
    // “旋转”操作
    child.right = node
    node.left = grandChild
    // 修正节点高度
    this.#updateHeight(node)
    this.#updateHeight(child)
    // 返回旋转后子树的根节点
    return child
  }

  /**
   * 左旋以 node 为根节点的子树，已重新成为平衡树
   * @param {AVLTreeNOde} node 失衡的节点（balanceFactor > 1）
   */
  #leftRotate(node) {
    const child = node.right
    const grandChild = child.left
    // “旋转”操作
    child.left = node
    node.right = grandChild
    // 修正节点高度
    this.#updateHeight(node)
    this.#updateHeight(child)
    // 返回旋转后子树的根节点
    return child
  }
}

module.exports = { TreeNode }
