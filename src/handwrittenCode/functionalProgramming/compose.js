/** NOTE: 函数组合：
 * 我们需要写一个函数，输入 'kevin'，返回 'HELLO, KEVIN'。
 * - compose 接收一组函数，返回一个函数，函数接收参数并从右向左依次执行函数
 * - 上一个函数的返回值作为下一个函数的入参
 * const finalFunction = compose(functionB, functionA)
 */
export function compose() {
  const slice = Array.prototype.slice
  const fnArr = slice.call(arguments)
  const st = fnArr.length - 1
  return function () {
    let res = fnArr[st].apply(this, arguments)
    let i = st
    while (i--) {
      res = fnArr[i].call(this, res)
    }
    return res
  }
}

// NOTE: reduce 版本
function composeSimple(...fns) {
  if (fns.length === 0) return (...arg) => arg
  if (fns.length === 1) return fns[0]

  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}

// NOTE: 从左至右执行
export function composeLeft(...fns) {
  if (!fns.length) return (...args) => args
  if (fns.length === 1) return fns[0]
  return fns.reduce(
    (a, b) =>
      (...args) =>
        b(a(...args))
  )
}

// TEST:
var toUpperCase = function (x) {
  return x.toUpperCase()
}
var hello = function (x) {
  return 'HELLO, ' + x
}
// var ask = x => `${x}. I'm Aimee, Where are you from?`

var greet = composeLeft(toUpperCase, hello)
// const testFn = compose(ask, greet)
// console.log('🚀 ~ testFn:', testFn('Lily'))

console.log(greet('kevin'))
