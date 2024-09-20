/** NOTE: 函数缓存：常用于存储昂贵计算函数的结果值，降低开销 */
function memorize(fn) {
  const map = new Map()
  return function () {
    const args = [].slice.call(arguments)
    const key = args.toString()
    if (map.has(key)) {
      console.log("重复计算，直接返回缓存中的计算值")
      return map.get(key)
    }
    const res = fn.apply(this, args)

    map.set(args.toString(), res)
    return res
  }
}

// TEST:
function sumTwo(x, y) {
  return x + y
}
const memorizeSum = memorize(sumTwo)

console.log(memorizeSum(1, 2))
console.log(memorizeSum(4, 6))
console.log(memorizeSum(4, 7))
console.log(memorizeSum(1, 2))
