// NOTE: 手写 promise
/**
 * [参考文献](https://juejin.cn/post/6994594642280857630)
 * 1. Promise 首先是一个构造函数，即可通过 new Promise 实例化
 *  - 接收一个回调函数 cb，回调函数会自动传入两个 API 参数 resolve/reject
 *  - 返回一个实例对象
 * 2. 实例的API: .then/.catch/.finally，每个 API 调用后会返回一个新的 Promise 实例
 * 3. 静态 API: .resolve/.reject/.all/.allSettled/.race/.any
 */
class MyPromise {
  #StatusMap = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
  }
  #onResolvedCallbacks
  #onRejectedCallbacks

  constructor(executor) {
    this.status = this.#StatusMap.PENDING
    this.value = undefined
    this.#onResolvedCallbacks = []
    this.#onRejectedCallbacks = []

    /**
     * NOTE: 关于 value 不同类型的处理说明
     * 1. value 为 Thenable 对象，resolve 内部会尝试调用 Thenable 对象的 then 方法，并将 resolve 和 reject 作为参数传递给 then 方法。
     *  - 如果 .then 内部返回一个值，则该值作为 resolve 的 value 兑现当前 Promise
     *  - 如果 .then 内部抛出异常，则异常值作为 reject 的 reason 兑现当前 Promise
     * 2. value 为另一个 Promise 实例，则当前 Promise 等待该实例兑现后以它的结果作为自己的结果兑现
     * @param {Promise | primitive value | Thenable} value
     * @returns
     */
    const resolve = value => {
      if (this.status !== this.#StatusMap.PENDING) return

      // 处理 Thenable 对象
      if (value !== null && ['object', 'function'].includes(typeof value)) {
        try {
          const then = value?.then
          if (typeof then === 'function') {
            then.call(value, resolve, reject)
            return
          }
          // 如果没有 .then 方法则视为普通值进入正常流程
        } catch (e) {
          reject(e)
          return
        }
      }

      // 正常流程
      this.status = this.#StatusMap.FULFILLED
      this.value = value

      // 清空存储的先行成功回调
      while (this.#onResolvedCallbacks.length) {
        this.#onResolvedCallbacks.shift()(/**value*/) // NOTE: 此处可不传 value，因为 resolvePromise 内部调用 cb 时直接访问的当前实例的 value，即 this.value
      }
    }
    const reject = reason => {
      if (this.status !== this.#StatusMap.PENDING) return

      this.status = this.#StatusMap.REJECTED
      this.value = reason

      // 清空存储的先行失败回调
      while (this.#onRejectedCallbacks.length) {
        this.#onRejectedCallbacks.shift()(/**reason*/)
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  /** ------ 实例方法 ---------- */
  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          }
    const p = new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          // NOTE: 暂用 setTimeout 这个宏任务来代替模拟 .then 微任务的执行流程
          try {
            // console.log('--- resolvePromise this.value', this, this.value)
            const res = cb(this.value)
            if (res === p) {
              // 不能返回自身
              return reject(
                new TypeError(
                  'UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>'
                )
              )
            }
            if (res instanceof MyPromise) {
              return res.then(resolve, reject)
            }
            return resolve(res)
          } catch (e) {
            reject(e)
            throw e
            // throw e instanceof Error ? e : new Error(e)
          }
        }, 0)
      }
      if (this.status === this.#StatusMap.FULFILLED) {
        // console.log('--- then sync fulfilled', this.value)
        resolvePromise(onFulfilled)
      } else if (this.status === this.#StatusMap.REJECTED) {
        // console.log('--- then sync rejected', this.value)
        resolvePromise(onRejected)
      } else {
        // console.log('--- then async')
        // PENDING: 异步
        this.#onResolvedCallbacks.push(() => resolvePromise(onFulfilled))
        this.#onRejectedCallbacks.push(() => resolvePromise(onRejected))
      }
    })
    return p
  }

  catch = onRejected => {
    return this.then(null, onRejected)
  }

  // NOTE: finally 需要「值穿透」即：将上一个 .then/.catch 的结果值向下传递，故不能直接 return this.then(cb, cb)，会丢失值
  finally = cb => {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason =>
        MyPromise.resolve(cb()).then(() => {
          throw reason
        })
    )
  }

  /** ------ 静态方法 ---------- */
  /**
   *
   * Promise.resolve() 静态方法以给定值“解决（resolve）”一个 Promise。
   * 如果该值本身就是一个 Promise，那么该 Promise 将被返回；
   * 如果该值是一个 thenable 对象，Promise.resolve() 将调用其 then() 方法及其两个回调函数；
   * 否则，返回的 Promise 将会以该值兑现。
   */
  static resolve = value => {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise(resolve => {
      // 包含 Thenable 的处理
      resolve(value)
    })
  }

  /**
   * Promise.reject() 静态方法返回一个已拒绝（rejected）的 Promise 对象，拒绝原因为给定的参数。
   */
  static reject = value => {
    return new MyPromise((_, reject) => {
      // 包含 Thenable 的处理
      reject(value)
    })
  }

  /**
   * NOTE: MyPromise.all 实现
   * - 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
   * - 如果所有Promise都成功，则返回成功结果数组
   * - 如果有一个Promise失败，则返回这个失败结果
   * @param {Array<MyPromise>} promises
   */
  static all = promises => {
    const n = promises.length
    let ans = [],
      cnt = 0
    return new MyPromise((resolve, reject) => {
      const addValue = (idx, value) => {
        ans[idx] = value
        cnt++
        if (cnt === n) resolve(ans)
      }
      promises.forEach((p, idx) => {
        if (p instanceof MyPromise) {
          p.then(v => addValue(idx, v), reject)
        } else {
          addValue(idx, p)
        }
      })
    })
  }

  /**
   * NOTE: MyPromise.race 实现
   * - 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
   * - 哪个Promise最快得到结果，就返回那个结果，无论成功失败
   */
  static race = promises => {
    return new MyPromise((resolve, reject) => {
      promises.forEach(p => {
        if (p instanceof MyPromise) {
          p.then(resolve, reject)
        } else {
          resolve(p)
        }
      })
    })
  }

  /**
   * NOTE: MyPromise.allSettled 实现
   * - 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
   * - 把每一个Promise的结果，集合成数组，返回
   */
  static allSettled = promises => {
    return new MyPromise((resolve, reject) => {
      const n = promises.length
      let ans = new Array(n),
        cnt = 0
      const addValue = (idx, value) => {
        ans[idx] = value
        cnt++
        if (cnt === n) resolve(ans)
      }
      promises.forEach((p, idx) => {
        if (p instanceof MyPromise) {
          p.then(
            v => {
              addValue(idx, { status: 'fulfilled', value: v })
            },
            e => {
              addValue(idx, { status: 'rejected', reason: e })
            }
          )
        } else {
          addValue(idx, { status: 'fulfilled', value: p })
        }
      })
    })
  }

  /**
   * NOTE: MyPromise.any 实现（与 all 相反）
   * 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
   * 如果有一个 Promise 成功，则返回这个成功结果
   * 如果所有 Promise 都失败，则报错
   */
  static any = promises => {
    return new MyPromise((resolve, reject) => {
      let cnt = 0
      const ans = []
      const adErrorValue = (idx, value) => {
        cnt++
        ans[idx] = value
        if (cnt === promises.length) {
          reject(new AggregateError(ans, 'any errors'))
        }
      }
      promises.forEach(p => {
        if (p instanceof MyPromise) {
          p.then(resolve, adErrorValue)
        } else {
          return resolve(p)
        }
      })
    })
  }
}
module.exports = MyPromise

// TEST: 测试初始化、链式调用
// const p1 = new MyPromise((resolve, reject) => {
//   console.log('--- p1 executor')
//   setTimeout(() => {
//     resolve(10)
//     // reject('something went wrong!')
//   }, 1000)
// })
//   .then(res => {
//     console.log('--- p1 then1', res)
//     return new MyPromise((resolve, reject) => {
//       setTimeout(() => {
//         reject(res * 4)
//       }, 1000)
//     })
//   })
//   .then(
//     res => {
//       console.log('--- p1 then2 resolve', res)
//       throw new Error('--- p1 then throw error')
//     },
//     e => {
//       console.log('--- p1 then2 rejected', e)
//       throw new Error('--- p1 then2 catch throw error')
//     }
//   )
//   .catch(e => console.log('--- p1 catch1', e?.message))
// console.log(p1)

// function checkMail() {
//   return new MyPromise((resolve, reject) => {
//     // if (Math.random() > 0.5) {
//     resolve('Mail has arrived')
//     // } else {
//     //   reject(new Error("Failed to arrive"));
//     // }
//   })
// }
// checkMail()
//   .then(mail => {
//     console.log(mail)
//     return mail
//   })
//   .finally(() => {
//     console.log('Experiment completed')
//   })
//   .then(res => {
//     console.log('=====', res) // NOTE: 需要获取到上一个 .then/.catch 的结果
//   })
//   .catch(err => {
//     console.error(err)
//   })

// function resolved(result) {
//   console.log('Resolved')
// }
// function rejected(result) {
//   console.log(result)
// }
// MyPromise.reject(new Error('fail')).then(resolved, rejected)
// Expected output: Error: fail

// TEST: 测试 .then 实例方法
// p1.then(
//   value => {
//     console.log('--- then 1', value)
//     return '[then1 fulfilled]: ' + value
//   },
//   reason => {
//     console.error('--- error 1', reason?.message)
//     return '[then1 rejected]: ' + reason?.message
//   }
// ).then(
//   value => {
//     console.log('--- then 2', value)
//   },
//   reason => {
//     console.log('--- error 2', reason?.message || reason)
//   }
// )

// TEST: 链式调用
// const test3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100) // 输出 状态：成功 值： 200
//   }, 1000)
//   // reject(100) // 输出 状态：成功 值：300
// })
//   .then(
//     res =>
//       new MyPromise(r => {
//         setTimeout(() => r(2 * res), 3000)
//       }),
//     err => 3 * err
//   )
//   .then(
//     res => console.log('成功', res),
//     err => console.log('失败', err)
//   )
// const test4 = new MyPromise((resolve, reject) => {
//   // resolve(100) // 输出 状态：失败 值：200
//   reject(100) // 输出 状态：成功 值：300
//   // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
// })
//   .then(
//     res => new MyPromise((resolve, reject) => reject(2 * res)),
//     err => new MyPromise((resolve, reject) => resolve(3 * err))
//   )
//   .then(
//     res => console.log('成功', res),
//     err => console.log('失败', err)
//   )

// TEST: 微任务
// const p = new MyPromise(r => {
//   r(1)
// }).then(v => console.log(v))
// console.log(2)

// TEST: 静态方法
// const promise1 = MyPromise.resolve(3)
// const promise2 = new MyPromise((resolve, reject) =>
//   setTimeout(reject, 100, 'foo')
// )
// // const thenable = {
// //   then: function (resolve, reject) {
// //     reject('Thenable')
// //   }
// // }
// const promises = [promise1, promise2]
// MyPromise.allSettled(promises).then(results =>
//   results.forEach(result => console.log(result))
// )
