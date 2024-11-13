/**
 * 防抖：停止触发 n 秒后响应最后一次
 * @param {Function} fn 需要被防抖的函数
 * @param {Number} wait 防抖时间
 * @param {Boolean} immediate 是否立即触发（true 每次计时开始前触发一次，false 每次防抖结束触发）-- true: 先调用后等待 还是 false: 先等待后调用
 * @returns 新的防抖函数
 * NOTE: 关于返回的防抖函数调用后的返回值问题，在 immediate 为 false 时,
 */
function debounce(fn, wait, immediate) {
  let timer, res
  return function () {
    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      if (callNow) {
        res = fn.apply(this, arguments)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
    return res
  }
}

// NOTE: 进阶版：带取消防抖版本
function debounceAdvance(func, wait, immediate) {
  var timer, res
  function debounced() {
    const context = this
    const args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) {
        res = fn.apply(context, args)
      }
    } else {
      timer = setTimeout(() => {
        res = func.apply(context, args)
      }, wait)
    }

    return res
  }
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

/** NOTE: 思考优化过程 */
// -- 第一版：停止触发 wait 毫秒后执行，解决了 this 和 传参问题
function debounce1(fn, wait) {
  let timer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

// -- 第二版：带 immediate 参数，控制是否立即触发（true 每次计时开始前触发一次，false 每次防抖结束触发）
/** timer 变量的变化赋值可以分开思考，immediate 为 true 时，每次触发时通过 timer 判断是否能够立即执行，指定时间之后（期间一直没有再次出发）将 timer 置为 null，方便下一次触发执行 */
function debounce2(fn, wait, immediate) {
  let timer
  return function () {
    const context = this
    const args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
  }
}

// -- 第三版：带取消功能
function debounce2(fn, wait, immediate) {
  let timer
  const debounced = function () {
    const context = this
    const args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
  }
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

var a = "global"
function f() {
  var a = "inner f"
  console.log(this.a)
}
const df = debounce2(f, 2000)

var o = { a: "obj", df }
o.df()
