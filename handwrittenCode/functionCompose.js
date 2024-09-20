/** NOTE:
 * 函数组合（从右往左执行）： compose = (a,b) => c => a(b(c))
 * 函数管道（从左往右执行）： compose = (a,b) => c => b(a(c))  */
function afn(a) {
  return a * 2
}
function bfn(b) {
  return b + 3
}
const compose = (a, b) => c => a(b(c))
let myfn = compose(afn, bfn)
console.log(myfn(2))

function composeCompleted() {
  const fns = [].slice.call(arguments)
  return function () {
    const args = [].slice.call(arguments)
    // NOTE: 如果不使用 reverse 则为管道函数
    fns.reverse().reduce((curr, prev) => {
      prev.apply(this, curr)
    }, args)
  }
}
