/** NOTE: 异步迭代器 */
const delay = async ms => await new Promise(r => setTimeout(r, ms))
// -- 普通函数版本
let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() {
    return {
      current: this.from,
      last: this.to,
      async next() {
        await delay(2000)
        if (this.current <= this.last) {
          return { done: false, value: this.current++ }
        }
        return { done: true }
      }
    }
  }
}

// ;(async () => {
//   for await (let x of range) {
//     console.log("🚀 ~ forawait ~ range ~ x:", x)
//   }
// })()

/** Generator 函数版本 */
let range1 = {
  from: 1,
  to: 5,

  async *[Symbol.asyncIterator]() {
    for (let i = this.from; i <= this.to; i++) {
      await delay(3000)
      yield i
    }
  }
}

;(async () => {
  for await (let x of range1) {
    console.log("🚀 ~ forawait ~ range1 ~ x:", x)
  }
})()
