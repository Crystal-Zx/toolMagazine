const MyPromise = require('./promise.cjs')

// // 测试脚本
// Promise.defer = Promise.deferred = function () {
//   let dfd = {}
//   dfd.promise = new Promise((resolve, reject) => {
//     dfd.resolve = resolve
//     dfd.reject = reject
//   })
//   return dfd
// }
const adapter = {
  resolved: value => {
    return new MyPromise(resolve => {
      resolve(value)
    })
  },
  rejected: reason => {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  },
  deferred: () => {
    let resolve, reject
    const promise = new MyPromise((res, rej) => {
      resolve = res
      reject = rej
    })
    return { promise, resolve, reject }
  }
}

module.exports = adapter
