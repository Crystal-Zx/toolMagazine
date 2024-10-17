// NOTE: 为 range 实现 for...of 迭代，依次输出 1, 2, 3, 4, 5
let range = {
  from: 1,
  to: 5
}

// 1. for..of 调用首先会调用这个：
// range[Symbol.iterator] = function () {
//   return {
//     current: this.from,
//     last: this.to,

//     next() {
//       if (this.current <= this.last) {
//         return { done: false, value: this.current++ }
//       }
//       return { done: true }
//     }
//   }
// }

// NOTE: -- 注释版本
// range[Symbol.iterator] = function () {
//   const context = this
//   return {
//     current: context.from,
//     last: context.to,

//     next() {
//       if (this.current <= this.last) {  // 此处的 this 指的是 next 方法的调用者，即返回的这个对象
//         return { done: false, value: this.current++ }
//       }
//       return { done: true }
//     }
//   }
// }

// NOTE: Generator 函数版本
range[Symbol.iterator] = function* () {
  let num = this.from
  for (let num = this.from; num <= this.to; num++) {
    yield num
  }
}
// -- 直接定义在可迭代对象内部
let range1 = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) {
      yield i
    }
  }
}

// TEST:
for (let num of range1) {
  console.log("🚀 ~ num:", num)
}
