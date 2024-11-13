// NOTE: 递归的理解：斐波那契数列
// -- 迭代
function fibonacci(n) {
  let res = []
  for (let i = 0; i < n; i++) {
    if (i == 0) res.push(0)
    else if (i == 1) res.push(1)
    else {
      res.push(res[i - 1] + res[i - 2])
    }
  }
  // console.log(res.length)
  return res.join(" ")
}
// console.log(fibonacci(40))

// -- 递归
function fibonacci1(n) {
  if (n <= 1) {
    return n === 1 ? 1 : 0
  } else {
    num = fibonacci1(n - 1) + fibonacci1(n - 2)
  }
  return num
}
// console.log(fibonacci1(10))
// --- 输出斐波那契数列
function createFib(count) {
  let res = []
  while (count) {
    res.push(fibonacci1(count--))
  }
  return res.reverse()
}

module.exports = createFib
