/**
 * NOTE: Thenable 对象
 * 指一个对象，它具有一个 then 方法，该方法接受两个类型为 function 的参数：onFulfilled 和 onRejected。
 */
const thenable = {
  then: function (onFulfilled, onRejected) {
    // 模拟异步操作
    setTimeout(() => {
      // resolved 值
      onRejected('Something went wrong!')
      onFulfilled('Hello, World!')
    }, 2000)
  }
}

// 使用 Thenable 对象
// NOTE: 普通 Thenable 对象内部的 onFulfilled/onRejected 可同时调用，在直接访问 thenable.then 时下述两个回调都会执行
thenable.then(
  value => {
    console.log(value) // 输出：Hello, World!
  },
  error => {
    console.error(error) // 输出：Something went wrong!
  }
)

// 使用 Promise.resolve 包装 thenable，使其遵循 Promise 规范
Promise.resolve(thenable).then(
  value => console.log(value), // 不会有输出
  error => console.error(error) // 输出：Something went wrong!
)
