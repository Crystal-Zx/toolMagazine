/**
 * NOTE: 第一版：未使用 ES5 之后的任意 API，兼容性最好，但复杂度稍高
 * @param {Array<any>} arr 待去重的数组
 * @returns
 */
function unique0(arr) {
  var ans = []
  for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
    for (var j = 0; j < ans.length; j++) {
      if (ans[j] === arr[i]) break
    }
    if (j === ans.length) {
      ans.push(arr[i])
    }
  }
  return ans
}

/**
 * NOTE: 第二版：使用 ES5 的 indexOf
 * @param {Array<any>} arr 待去重的数组
 * @returns
 */
function unique1(arr) {
  var ans = []
  for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
    if (ans.indexOf(arr[i]) === -1) {
      ans.push(arr[i])
    }
  }
  return ans
}

/**
 * NOTE: 第三版：排序后去重，适合与已有序数组的去重，复杂度优于 indexOf
 * 但需要注意的是，受限于 sort 的原理，本方法不能完全保证去重，例如 [1, '1', 1] 就会出错
 * @param {Array<any>} arr 待去重的数组
 * @returns
 */
function unique2(arr) {
  arr.sort((a, b) => a - b) // 升序
  let ans = []
  for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
    if (arr[i] !== ans[ans.length - 1]) {
      ans.push(arr[i])
    }
  }
  return ans
}

// NOTE: ES6 Set 去重
function unique3(arr) {
  return [...new Set(arr)]
}
