/**
 * nOTE: 二叉树层序遍历（基于广度优先搜索 BFS 实现）
 * @param {*} root 二叉树根节点
 * @returns {Array} res 层序遍历节点值组成的数组
 *
 * 复杂度分析：设节点总数为 n
 * 时间复杂度：每一个节点都只会被出入队一次，故为 O(n)
 * 空间复杂度：队列中元素最多时为叶节点全部入队时，为 O(n)【(n + 1) / 2】
 * ---> n = 2 ^ (h + 1) - 1 , 叶节点数量为 2 ^ h <==> (n + 1) / 2
 * */
function levelOrder(root) {
  const queue = [],
    res = []
  if (!root) return res

  queue.push(root)
  while (queue.length) {
    const node = queue.shift()
    res.push(node.val)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
  return res
}
