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
  #onResolvedCallbacks = []
  #onRejectedCallbacks = []

  constructor(executor) {
    this.status = this.#StatusMap.PENDING
    this.value = undefined

    const resolve = value => {
      if (this.status !== this.#StatusMap.PENDING) return
      this.value = value
      this.status = this.#StatusMap.FULFILLED
      while (this.#onResolvedCallbacks.length) {
        this.#onResolvedCallbacks.shift()(value)
      }
    }

    const reject = reason => {
      if (this.status !== this.#StatusMap.PENDING) return
      this.value = reason
      this.status = this.#StatusMap.REJECTED
      while (this.#onRejectedCallbacks.length) {
        this.#onRejectedCallbacks.shift()(reason)
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw new Error(reason) // TODO: 抛出错误并在后续链式调用时处理
          }

    var p = new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          // NOTE: 模拟 .then 微任务，将其放在下一个事件循环中调用
          try {
            let res = cb(this.value)
            if (res === p) {
              throw new Error('不能返回自身')
            }
            if (res instanceof MyPromise) {
              // 返回值为 Promise 实例时，链式调用 resolve 还是 reject 取决于 res 这个 promise 新实例的结果
              return res.then(resolve, reject)
            }
            return resolve(res) // 返回值为普通值时，当前实例默认成功
          } catch (e) {
            reject(e) // executor 中的错误捕获
            throw new Error(e) // reject 需要将错误抛出，Promise 调用确保最后一层有 catch，避免 unhandled promise rejection
          }
        }, 0)
      }

      if (this.status === this.#StatusMap.FULFILLED) {
        resolvePromise(onFulfilled)
      } else if (this.status === this.#StatusMap.REJECTED) {
        resolvePromise(onRejected)
      } else {
        // NOTE: 异步下进入 PENDING，如 定时器等，先将处理函数先放入队列待执行
        this.#onResolvedCallbacks.push(value => {
          resolvePromise(() => onFulfilled(value))
        })
        this.#onRejectedCallbacks.push(reason => {
          resolvePromise(() => onRejected(reason))
        })
      }
    })
    return p

    // TODO: return 新的 Promise 实例
  }

  /** ------ 静态方法 ---------- */
  /**
   * 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
   * 如果所有Promise都成功，则返回成功结果数组
   * 如果有一个Promise失败，则返回这个失败结果
   * @param {Array<MyPromise>} promises
   */
  static all = promises => {
    const n = promises.length
    let ans = [],
      cnt = 0
    return new MyPromise((resolve, reject) => {
      promises.forEach((p, idx) => {
        if (p instanceof MyPromise) {
          p.then(v => {
            ans[idx] = v
          }, reject)
        } else {
          ans[idx] = p
        }
      })
    })
  }
}

// TEST: 测试初始化
// const p1 = new MyPromise((resolve, reject) => {
//   throw new Error('executor error')
//   setTimeout(() => {
//     resolve('success')
//     // reject('something went wrong!')
//   }, 1000)
// })
// console.log(p1)

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
//   resolve(100) // 输出 状态：成功 值： 200
//   // reject(100) // 输出 状态：成功 值：300
// })
//   .then(
//     res => 2 * res,
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
const p = new MyPromise(r => {
  r(1)
}).then(v => console.log(v))
console.log(2)
