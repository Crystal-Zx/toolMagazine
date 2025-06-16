/**
 *
 * @param {array[]} arr 待拍平数组
 * @param {array[]} ans 当前已拍平数组
 * @returns
 */
function flatten(arr, ans = []) {
  if (!arr) return
  for (let item of arr) {
    if (Array.isArray(item)) {
      const a = flatten(item, ans)
      if (a) ans.concat(a)
    } else {
      ans.push(item)
    }
  }
  return ans
}

console.log(flatten([1, 2, 3, [4, 5, 6], 7, [8, 9]]))
