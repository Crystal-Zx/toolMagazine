/**
 * 概念及判断方法起源于 JQuery，用于判断一个值是否为纯粹的对象（{} 或是 new Object)() 方式创建），它内部有零个或多个键值对
 * 用于将 {} 或者 new Object() 构造出的对象与 [ null/数组/宿主对象（documents） ] 等作区分，因为它们的 typeof 均返回 object
 * 定义规则概述：
 * 1. 对象
 * 2. 没有原型 || 原型为 Object.prototype
 */
const o = {}
const toString = o.toString // 相当于 Object.prototype.toString
const hasOwn = o.hasOwnProperty // 相当于 Object.prototype.hasOwnProperty，返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）

// NOTE: 检测 plainObject 的方法
const isPlainObject = obj => {
  // 排除掉明显不是 obj 的以及一些宿主对象如 Window
  if (!obj || toString.call(obj) !== "[object Object]") return false

  // Object.getPrototypeOf 返回指定对象的原型（内部[[Prototype]]属性的值）
  const proto = Object.getPrototypeOf(obj)
  // 没有原型对象的对象直接返回 true
  if (!proto) return true

  // 若传入参数的原型对象（proto）自身有 constructor 属性（非原型链上能查找到的），那么返回其原型对象的构造函数(prototype.constructor的值)
  const Ctor = hasOwn.call(proto, "constructor") && proto.constructor
  console.log(Ctor === Object)
  /**
   * 关于 hasOwn.toString.call(Ctor) 的解释
   * hasOwn 是一个函数，它自身没有 toString 方法，通过原型链查找会找到 Function.prototype.toString 并以 Ctor 为 this 指向进行调用，
   * 即： Function.prototype.toString.call(Ctor)
   * 而 Function.prototype 是一个对象，JS 中所有的对象的原型对象都是 Object.prototype，
   * 即： Object.getPrototypeOf(Function.prototype) === Object.prototype
   * 若是 Function.prototype 上没有 toString 方法，则会继续顺着原型链查找并最终调用 Object.prototype.toString 方法
   * 但！！！！ Function.prototype 覆写了 Object.prototype.toString 方法，故最终调用的是 Function.prototype.toString 方法
   *
   * Function.prototype.toString 返回一个表示当前函数源代码的字符串，如:
   * - console.log((function test() {}).toString()); // "function test() {}"
   * - console.log(hasOwn.toString.call(Ctor)); // "function Object() { [native code] }""
   * Object.prototype.toString 返回一个表示该对象的字符串，如 "[object Object]"
   */
  return (
    typeof Ctor === "function" &&
    hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
  )
}

function Person(name) {
  this.name = name
}

console.log(isPlainObject({})) // true

// console.log(isPlainObject(new Object())) // true

// console.log(isPlainObject(Object.create(null))) // true

// console.log(isPlainObject(Object.assign({ a: 1 }, { b: 2 }))) // true

// console.log(isPlainObject(new Person("yayu"))) // false

// console.log(isPlainObject(Object.create({}))) // false
