/**
 * 基础版节流【定时器版本】：首次触发后需等待 wait 才会执行
 * @param {Function} fn 将要被节流的函数
 * @param {Number} wait 节流的时间
 * @returns 新的节流函数
 */
function throttleTimeout(fn, wait) {
  let timer
  return function () {
    if (timer) return
    setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, wait)
  }
}

/**
 * 基础版节流【时间戳版本】: 首次触发时若超过 wait 会立即执行
 * @param {Function} fn 将要被节流的函数
 * @param {Number} wait 节流的时间
 * @returns 新的节流函数
 */
function throttleTimestamp(fn, wait) {
  let prev = 0,
    res
  return function () {
    let now = Date.now() // +new Date() 也可
    if (now - prev > wait) {
      res = fn.apply(this, arguments)
      prev = now
    }
    return res
  }
}

function throttle(fn, wait) {
  let timer,
    prev = 0,
    res
  return function () {
    const now = Date.now()
    const remaining = wait - (now - prev)

    // 没有剩余的时间了或者用户改了系统时间
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器，则将定时器回调取消掉
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      res = fn.apply(this, arguments)
      prev = now // 更新时间
    } else if (!timer) {
      timer = setTimeout(() => {
        res = fn.apply(this, arguments)
        prev = Date.now()
        timer = null
      }, remaining)
    }
    return res
  }
}

// NOTE: 带取消的版本
function throttleWithCancel(fn, wait, options = {}) {
  let timer,
    prev = 0
  const context = this
  const args = arguments
  const { leading, trailing } = options

  const throttled = function () {
    const now = +new Date()
    if (!leading) prev = now
    const remaining = wait - (now - prev)
    let res
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      res = fn.apply(context, args)
      prev = now
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
        prev = +new Date()
      }, remaining)
    }
    return res
  }
  throttled.cancel = function () {
    prev = 0
    clearTimeout(timer)
    timer = null
  }
}
