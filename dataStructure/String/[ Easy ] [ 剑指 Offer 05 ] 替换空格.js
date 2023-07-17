/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  s = s.split("")
  var len = s.length
  var left = (right = len - 1)
  // console.log(left, right)
  for (var i = 0; i < len; i++) {
    if (s[i] === " ") right += 2
  }
  while (left < right) {
    if (s[left] === " ") {
      s[right--] = "0"
      s[right--] = "2"
      s[right--] = "%"
    } else {
      s[right--] = s[left--]
    }
  }
  return s.join("")
}

console.log(replaceSpace("We are"))
