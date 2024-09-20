/** NOTE: 函数柯里化：把一个多参数函数转化成一个嵌套的一元函数的过程 */
function curry(fn) {
  return function () {
    const args1 = arguments
    const context = this
    return function () {
      return fn.apply(context, [...args1, ...arguments])
    }
  }
}
const sumTwo = (x, y) => x + y

// TEST:
const currySumTwo = curry(sumTwo)
console.log(currySumTwo(4)(6))

function curryWithFn(fn) {
  const args = [].slice.call(arguments, 1)
  return function () {
    return fn.apply(this, args.concat([...arguments]))
  }
}
