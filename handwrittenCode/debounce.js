/**
 * 进阶版防抖
 * @param {Function} fn 需要被防抖的函数
 * @param {Number} wait 防抖时间
 * @param {Boolean} immediate 是否立即触发（true 每次计时开始前触发一次，false 每次防抖结束触发）
 * @returns 新的防抖函数
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
        res = fn.apply(this, arguments)
      }, wait)
    }
    return res
  }
}

// NOTE: 带取消防抖版本
function debounce1(func, wait, immediate) {
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

// TEMP: 防抖：停止触发 n 秒后响应最后一次
function debounce2(fn, wait) {
  let timer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}

var a = "global"
function f() {
  var a = "inner f"
  console.log(this.a)
}
const df = debounce2(f, 2000)

var o = { a: "obj", df }
o.df()
