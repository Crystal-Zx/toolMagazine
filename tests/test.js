// var findNumberIn2DArray = function (matrix, target) {
//   let x = 0,
//     y = 0
//   while (x < matrix.length) {
//     console.log(x, y, matrix[x][y])
//     if (matrix[x][y] === target) {
//       return true
//     } else if (matrix[x][y] < target && y < matrix[0].length) {
//       y++
//     } else {
//       //  if(matrix[x][y] > target || y >= matrix[0].length)
//       y = y - 1
//       x = x + 1
//     }
//   }
//   return false
// }

// let arr = [
//   [1, 4, 7, 11, 15],
//   [2, 5, 8, 12, 19],
//   [3, 6, 9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30],
// ]

// dp[i][j]：表示从（0, 0）出发，到(i, j) 有 dp[i][j] 条不同的路径
var uniquePathsWithObstacles = function (obstacleGrid) {
  const row = obstacleGrid.length,
    col = obstacleGrid[0].length
  const dp = Array(col)
  for (let i = 0; i < col; i++) {
    if (obstacleGrid[0][i] === 1) {
      dp[i] = 0
    } else if (i === 0) {
      dp[i] = 1
    } else {
      dp[i] = dp[i - 1]
    }
  }
  console.log(dp)

  for (let i = 1; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[j] = 0
      } else if (!!j) {
        dp[j] += dp[j - 1]
      }
    }
  }
  return dp[col - 1]

  // for (let i = 0; i < row; i++) {
  //   for (let j = 0; j < col; j++) {
  //     if (obstacleGrid[i][j]) {
  //       obstacleGrid[i][j] = 0
  //     } else {
  //       obstacleGrid[i][j] =
  //         (obstacleGrid[i - 1][j] ?? 0) + (obstacleGrid[i][j - 1] ?? 0)
  //     }
  //   }
  // }
  // console.log(obstacleGrid)
}

// console.log(
//   uniquePathsWithObstacles([
//     [0, 0, 0],
//     [0, 1, 0],
//     [0, 0, 0],
//   ])
// )

// let obj1 = {},
//   obj2 = { obj1: obj1 }
// obj1.obj2 = obj2
// const o1 = {
//   a: undefined,
//   b: Symbol("b"),
//   c: new Date(),
//   d: new RegExp(/\[object (\S*)\]/),
//   // e: new Error("sorry"),
//   f: new Set([1, 2, 2, 4]),
//   g: new Map(),
//   h: null,
//   arr: [1, 2, 3],
//   bigInt: BigInt(1),
//   // obj1,
//   // obj2,
//   fn: function () {},
// }

function clone(target, map = new WeakMap()) {
  if (typeof target === "object" && target !== null) {
    // 解决循环引用
    if (map.get(target)) {
      return map.get(target)
    }
    let cloneTarget = Array.isArray(target) ? [] : {} // 考虑数组
    map.set(target, cloneTarget) // WeakMap 的键必须是对象，不能是原始值
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}
// let o2 = clone(o1)
// let o2 = JSON.parse(JSON.stringify(o1))
// console.log(o1, o2)

// setImmediate(() => {
//   console.log("timeout1")
//   Promise.resolve().then(() => console.log("promise resolve"))
//   process.nextTick(() => console.log("next tick1"))
// })
// setImmediate(() => {
//   console.log("timeout2")
//   process.nextTick(() => console.log("next tick2"))
// })
// setImmediate(() => console.log("timeout3"))
// setImmediate(() => console.log("timeout4"))

// console.log("outer")

// setTimeout(() => {
//   setTimeout(() => {
//     console.log("setTimeout")
//   }, 0)
//   setImmediate(() => {
//     console.log("setImmediate")
//   })
// }, 0)

Function.prototype._call = function (context) {
  context = context ? Object(context) : global
  context.fn = this
  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]")
  }
  var res = eval("context.fn(" + args + ")")
  delete context.fn
  return res
}
Function.prototype._apply = function (context, arr) {
  context = context ? Object(context) : window

  context.fn = this
  // 初始化参数列表
  if (!arr) {
    return context.fn()
  }

  // 初始化参数列表
  // NOTE: 虽然 apply 接收一个数组类型的参数列表，但采用 eval 时传入 ‘kevin' 会被识别成一个变量，会导致报错： ReferenceError: Kevin is not defined
  var args = []
  for (var i = 0, len = arr.length; i < len; i++) {
    args.push("arr[" + i + "]")
  }
  res = eval("context.fn(" + args + ")")

  delete context.fn
  return res
}

// 可以修改函数this指向。
// bind返回一个绑定了this的新函数boundFcuntion，例子中我们用bound表示。
// 支持函数柯里化，我们在返回bound函数时已传递了部分参数2，在调用时bound补全了剩余参数。
// boundFunction的this无法再被修改，使用call、apply也不行。
Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not a callable"
    )
  }
  context = context ? Object(context) : window
  const self = this
  const firstArgs = [].slice.call(arguments, 1)
  function fNOP() {}
  function fBound() {
    const bindArgs = firstArgs.concat([].slice.call(arguments))
    return self._apply(this instanceof fBound ? this : context, bindArgs)
    // return self._apply(new.target === fBound ? this : context, bindArgs)
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

// 以下为功能测试代码：
var value = 2
var foo = {
  value: 1,
}
function bar(name, age) {
  this.habit = "shopping"
  console.log(this.value)
  console.log(name)
  console.log(age)
  return "bar excute over"
}
bar.prototype.friend = "kevin"
var bindFoo = bar._bind(foo, "daisy")
console.log("===bindFoo", bindFoo())
console.log("===new绑定执行后：")
var obj = new bindFoo("18")
console.log("===obj", obj.friend)

// function Fn() {
//   this.name = "听风是风"
//   this.sayAge = function () {
//     console.log(this.age)
//   }
// }
// Fn.prototype.age = 26

// var o = new Fn()
// o.sayAge() //26
// //我们改变实例继承的构造器属性，并不会影响构造函数本身
// o.name = "echo"
// var o1 = new Fn()
// console.log(o1.name) //听风是风

// var z = 0
// var obj = {
//   z: 1,
// }

// function fn(x, y) {
//   this.name = "听风是风"
//   console.log(this.z)
//   console.log(x)
//   console.log(y)
// }
// fn.prototype.age = 26

// var BoundFn = fn._bind(obj, 2)
// var person = new BoundFn(3) //undefined 2 3

// console.log(person.name) //听风是风
// console.log(person.age) //26
