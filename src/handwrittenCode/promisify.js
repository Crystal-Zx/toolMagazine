function loadScript(src, callback) {
  let script = document.createElement("script")
  script.src = src

  script.onload = () => callback(null, script)
  script.onerror = () => callback(new Error(`Script load error for ${src}`))

  document.head.append(script)
}

/**
 * NOTE:
 * 作用：它接受一个需要被 promise 化的函数 f，并返回一个包装（wrapper）函数
 * - (假设原始函数 f 期望一个带有两个参数 (err, result) 的回调)
 */
function promisify(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const callback = (error, res) => {
        if (error) reject(error)
        else resolve(res)
      }
      f.apply(this, [...args, callback])
    })
  }
}
