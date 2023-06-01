/**
 * NOTE:
 * [ Medium ] [ leetcode - 1019 ] 链表中的下一个更大节点
 * https://leetcode.cn/problems/next-greater-node-in-linked-list/
 */

const { LinkedList } = require("../../LinkedList")

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
// 方法一
var nextLargerNodes1 = function (head) {
  const ans = [],
    stack = []
  let idx = 0,
    node = head
  while (node) {
    let val = node.elem
    while (stack.length && val > stack[stack.length - 1][1]) {
      ans[stack.pop()[0]] = val
    }
    stack.push([idx++, val])
    node = node.next
  }
  for (let i = 0; i < idx; i++) {
    if (ans[i] === undefined) ans[i] = 0
  }
  return ans
}

// 方法二 非常🐂的思路！！
var nextLargerNodes2 = function (head) {
  const ans = [],
    stack = []
  let node = head
  while (node) {
    let val = node.elem
    let k = ans.length - 1
    while (val > stack[stack.length - 1]) {
      while (ans[k]) k--
      ans[k] = val
      stack.pop()
    }
    stack.push(val)
    ans.push(0)
    node = node.next
  }
  return ans
}

const ll = new LinkedList()
ll.append(2)
ll.append(7)
ll.append(4)
ll.append(3)
ll.append(5)
console.log(nextLargerNodes2(ll.head))
