let res = []
var reversePrint = function (head) {
  if (!head || !head.next) return res
  if (head.next) {
    return res.push(reversePrint(head.next))
  }
  console.log(res)
  return res
}
