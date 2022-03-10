/**
 * NOTE: JS 类型判断工具函数
 * 如果是基本类型，就使用 typeof，引用类型就使用 toString。此外鉴于 typeof 的结果是小写，我也希望所有的结果都是小写。
 *  */
/** -- 我的版本 */
function typeJudge(val) {
  // NOTE: undefined == null 返回 true
  if (val == null) return val + ""
  return typeof val === "object" || typeof val === "function"
    ? letterConvert(Object.prototype.toString.call(val))
    : typeof val
}

function letterConvert(letter) {
  return letter.match(/\[object (\S*)\]/)[1].toLowerCase()
}

/** -- 冴羽大佬的版本 */
var class2type = {}
// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error"
  .split(" ")
  .map(function (item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase()
  })
function type(obj) {
  // 一箭双雕
  if (obj == null) {
    return obj + ""
  }
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[Object.prototype.toString.call(obj)] || "object"
    : typeof obj
}

// NOTE: 判断数组
var isArray =
  Array.isArray ||
  function (val) {
    return type(val) === "array"
  }

// 测试用例
// console.log(typeJudge(2))
// console.log(typeJudge("2"))
// console.log(typeJudge(true))
// console.log(typeJudge(undefined))
// console.log(typeJudge(null))
// console.log(typeJudge(Symbol("foo")))
// console.log(typeJudge(2172141653n))
// console.log(typeJudge(function () {}))
// console.log(typeJudge([]))
// console.log(typeJudge({}))
// console.log(typeJudge(new Date()))
// console.log(typeJudge(Math))
// console.log(typeJudge(JSON))
// ;(function fn() {
//   console.log(typeJudge(arguments)) // [object Arguments]
// })()
// console.log(typeJudge(new Set([1, 2, 3, 3, 4])))
// console.log(typeJudge({ 0: "a", 1: "b", length: 2 }))

module.exports = {
  typeJudge,
}
