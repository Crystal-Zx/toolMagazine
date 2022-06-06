/**
 * NOTE: 实现链表数据结构
 */
function LinkedList() {
  this.length = 0
  this.head = null
}
function Node(elem) {
  this.elem = elem
  this.next = null
}
// 向链表尾部添加一个新的项
LinkedList.prototype.append = function (elem) {
  const node = new Node(elem)
  let current
  if (!this.head) {
    this.head = node
  } else {
    current = this.head
    while (current.next) {
      current = current.next
    }
    current.next = node
  }
  this.length++ // 更新链表长度值
}
// 向链表指定位置插入一个新的项
LinkedList.prototype.insert = function (positionIdx, elem) {}
// 从链表指定位置删除一项
LinkedList.prototype.removeAt = function (positionIdx) {
  // 检查溢出
}
// 从链表删除一项
LinkedList.prototype.remove = function (elem) {}
// 返回指定项在链表中的索引，如果没有该元素，则返回 -1
LinkedList.prototype.indexOf = function (elem) {}
// 检测链表是否有值（如果链表中不包含任何元素，则返回 true；如果链表长度大于 0 则返回 false）
LinkedList.prototype.isEmpty = function () {}
// 返回链表包含的元素的个数
LinkedList.prototype.size = function () {}
// 返回链表的头结点元素
LinkedList.prototype.getHead = function () {}
// NOTE: 由于链表的项使用了 Node 类，故需要重写继承自对象的 toString 方法，使其只输出元素的值
LinkedList.prototype.toString = function () {}

const l1 = new LinkedList()
l1.append(0)
l1.append(1)
const l2 = new LinkedList()
console.log(l1, l2)
