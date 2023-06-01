const { typeJudge } = require("./typeJudge")

const deepTargets = ["array", "object", "set", "map", "arguments"]
function isObject(target) {
  const type = typeof target
  return target !== null && (type === "object" || type === "function")
}
function getInitial(target) {
  const Ctor = target.constructor
  return new Ctor()
}
function cloneReg(target) {
  const reFlags = /\w*$/
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}
// 除 function 外的大部分引用类型数据
// Bool、Number、String、String、Date、Error
function cloneOtherType(target, type) {
  const Ctor = target.constructor
  switch (type) {
    case "number":
    case "boolean":
    case "string":
    case "error":
    case "date":
      return new Ctor(target)
    case "regexp":
      return cloneReg(target)
    case "symbol":
      return cloneSymbol(target)
    default:
      return null
  }
}
/** NOTE: 深拷贝
 * 需要考虑 target 的类型：分为可遍历类型和不可遍历类型两种
 * 可遍历类型：set、map、object、array、arguments
 */
function deepClone1(target, map = new WeakMap()) {
  // 1. 基础类型的值直接返回
  if (!isObject(target)) return target
  // 基础类型 or 函数类型直接返回本身
  // if (target === null || typeof target !== "object") return target

  // 2. 初始化
  let cloneTarget
  const type = typeJudge(target)
  // -- 获取可遍历类型的新实例对象
  if (deepTargets.includes(type)) {
    cloneTarget = getInitial(target)
  } else {
    return cloneOtherType(target, type)
  }

  // 3. 防止循环引用
  if (map.get(target)) return map.get(target)
  map.set(target, cloneTarget)

  // 4. 克隆 set 类型
  if (type === "set") {
    target.forEach(val => {
      cloneTarget.add(deepClone1(val, map))
    })
    return cloneTarget
  }

  // 克隆 map
  if (type === "map") {
    target.forEach((val, key) => {
      cloneTarget.set(key, deepClone1(val, map))
    })
    return cloneTarget
  }

  // 克隆 对象和数组（能到这里的就剩 object、array 或是 arguments 三种了，所以不用再加判断）
  cloneTarget = Array.isArray(target) ? [] : {}
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = deepClone1(target[key], map)
    }
  }
  return cloneTarget
}

const map = new Map()
map.set("key", "value")
map.set("ConardLi", "code秘密花园")

const set = new Set()
set.add("ConardLi")
set.add("code秘密花园")

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  // 暂时未考虑函数的深拷贝
  // func1: () => {
  //   console.log("code秘密花园")
  // },
  // func2: function (a, b) {
  //   return a + b
  // },
}
target.target = target
const result = deepClone1(target)

// console.log(target)
console.log(result)
console.log(JSON.parse(JSON.stringify(target))) // 循环引用会报错

/**
 * 使用 while 改写 forEach
 * 根据博主的考量用于优化 for-in 循环效率，
 * 但根据实测，两种循环方式（for-in 和 while）其实差不多 */
function forEach(arr, iterator) {
  let index = -1
  const len = arr.length
  while (++index < len) {
    iterator(arr[index], index)
  }
  return arr
}
// NOTE: 可当做简易版深拷贝
function deepClone2(target, map = new WeakMap()) {
  if (typeof target === "object") {
    const isArray = Array.isArray(target)
    let cloneTarget = isArray ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    const keys = isArray ? undefined : Object.keys(target)
    forEach(keys || target, (val, key) => {
      if (keys) key = val
      cloneTarget[key] = deepClone2(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}
