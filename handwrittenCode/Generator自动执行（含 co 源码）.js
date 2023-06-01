var g = gen()
var result1 = g.next()

result1.value
  .then(function (data) {
    return data.json()
  })
  .then(function (data) {
    return g.next(data).value
  })
  .then(function (data) {
    return data.json()
  })
  .then(function (data) {
    return g.next(data).value
  })
  .then(function (data) {
    return data.json()
  })
  .then(function (data) {
    g.next(data)
  })

// 改写成递归
function* gen() {
  var r1 = yield fetch("https://api.github.com/users/github")
  var r2 = yield fetch("https://api.github.com/users/github/followers")
  var r3 = yield fetch("https://api.github.com/users/github/repos")

  console.log([r1.bio, r2[0].login, r3[0].full_name].join("\n"))
}
// Promise 形式
function run(gen) {
  const g = gen()
  function next(data) {
    const res = g.next(data)
    if (res.done) return

    res.value.then(data => next(data))
  }
  next()
}
// callback 形式
function run(gen) {
  const g = gen()

  function next(data) {
    let res = g.next(data)
    if (res.done) return

    res.value(next)
  }

  next()
}
// 综合完整版写法「 co 模块源码 」
function co(gen) {
  // 包装在 Promise 对象中以支持错误捕获
  return new Promise((resolve, reject) => {
    if (typeof gen == "function") gen = gen()

    if (!gen || typeof gen.next !== "function") return resolve(gen)

    function onFulfilled(res) {
      let ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }
    function onRejected(err) {
      let ret
      try {
        ret = gen.throw(err)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }

    function next(ret) {
      if (ret.done) return resolve(res.value)

      const value = toPromise(ret.value)
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected)
      return onRejected(
        new TypeError(
          "You may only yield a function, promise " +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
      )
    }

    next()
  })
}
co(gen)

const isPromise = f => "function" === typeof f.then

function thunkToPromise(fn) {
  return new Promise(function (resolve, reject) {
    fn(function (err, res) {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
function toPromise(obj) {
  if (isPromise(obj)) return obj
  if (typeof obj == "function") return thunkToPromise(obj)
  return obj
}

/** 以下为参考阅读内容，与本篇无关 */
// NOTE: 将回调函数转为 Promise 写法
function promisify(fn) {
  return function () {
    const args = Array.prototype.slice.call(arguments, 0)
    return new Promise((resolve, reject) => {
      const cb = function (err, res) {
        if (err) return reject(err)
        return resolve(res)
      }
      args.push(cb)
      fn.apply(this, args)
    })
  }
}

// promisify 使用
const loadFilePromise = promisify(loadFile)
loadFilePromise(...args)
  .then(res => {})
  .catch(err => {})
