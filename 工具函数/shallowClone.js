// 浅拷贝
function shallowClone(obj) {
  if (typeof obj !== "object" || !obj) return obj
  let _obj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      _obj[key] = obj[key]
    }
  }
  return _obj
}
const obj = { a: 1, b: 2, c: [3, 4] }
const newObj = shallowClone(obj)
console.log(newObj) // { a: 1, b: 2, c: [ 3, 4 ] }
newObj.c.push(5)
console.log(newObj, obj) // { a: 1, b: 2, c: [ 3, 4, 5 ] } { a: 1, b: 2, c: [ 3, 4, 5 ] }
