Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4) // Promise.resolve(4) 等价于 new Promise(r => r(4))
    // 参考 promise.cjs 实现中的 .then ，当调用 onFulfilled 返回一个 Promise 时，会直接调用该 Promise 的 .then 方法。即：等价于 return new Promise(r => r(4)).then(v => v)
  })
  .then(res => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
