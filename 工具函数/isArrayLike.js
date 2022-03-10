function isArrayLike(obj) {
  // obj 必须有 length属性
  var length = !!obj && "length" in obj && obj.length
  var typeRes = typeJudge(obj)

  // 排除掉函数和 Window 对象
  if (typeRes === "function" || isWindow(obj)) {
    return false
  }

  return (
    typeRes === "array" ||
    length === 0 ||
    (typeof length === "number" && length > 0 && length - 1 in obj)
  )
}
