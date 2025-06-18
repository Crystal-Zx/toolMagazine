/** NOTE: 函数柯里化：
 * - 在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
 * - curry 的这种用途可以理解为：参数复用。本质上是降低通用性，提高适用性。 */

/**
 * NOTE: 柯里化辅助函数
 * 接受一个函数，缓存其参数，返回一个新的函数接收后续参数，并最终用两次传入的参数按序组合，传入原函数调用
 * @param {function} fn
 * @param  {...any} args1 剩余参数
 * @returns {function} 接收剩余参数的新函数，新函数内部调用并返回了原函数的调用结果值
 */
function sub_curry(fn) {
  const args = [].slice.call(arguments, 1)
  return function () {
    const newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

/**
 * NOTE: 柯里化主函数
 * @param {function} fn 待进行柯里化的函数
 * @param {number} len 剩余待传参数个数，默认为原函数的形参个数
 * @return {function} 新函数，其内部判断如果参数已达到原函数形参个数，直接调用并返回原函数结果，否则利用 sub_curry 返回一个新函数，将本次传入参数缓存
 */
export function curry(fn, len = fn.length) {
  const slice = Array.prototype.slice
  return function () {
    if (arguments.length < len) {
      const params = [fn].concat(slice.call(arguments))
      return curry(sub_curry.apply(this, params), len - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

// NOTE: 精简版
var currySimple = fn =>
  (judge = (...args) =>
    args.length === fn.length ? fn(...args) : arg => judge(...args, arg))

// TEST:
// function add(a, b, c) {
//   return a + b + c
// }

// let cfn1 = cpCurry(add)
// console.log(cfn1(1, 4)(3))
// console.log(cfn1(1, 2, 3))
// console.log(cfn1(1)(2, 3))
