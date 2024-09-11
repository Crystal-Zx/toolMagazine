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
