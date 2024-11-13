/**
 * new 的模式实现
 * 1. 方法定义： new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
 * 2. 实现的功能：
 * 2.1 创建一个新对象
 * 2.2 这个新对象会被执行 [[Prototype]] 连接
 * 2.3 这个新对象会绑定到构造函数调用的 this
 * 2.4 若构造函数未返回其他对象，则 new 表达式中的函数调用会自动返回这个新对象
 */

function objectFactory() {
  // 2.1 创建一个新对象
  var obj = Object.create()
  // 2.2 这个新对象会被执行 [[Prototype]] 连接
  var Constructor = [].shift.call(arguments)
  obj.__proto___ = Constructor.prototype
  // 2.3 这个新对象会绑定到构造函数调用的 this
  var res = Constructor.apply(obj, arguments)
  // 2.4 若构造函数未返回其他对象，则 new 表达式中的函数调用会自动返回这个新对象
  return typeof res === "object" && res !== null ? res : obj
}

// 优化版本
function objectFactory1() {
  var Constructor = [].shift.call(arguments)
  var obj = Object.create(Constructor.prototype) // 等同于 obj.__proto___ = Constructor.prototype
  var res = Constructor.apply(obj, arguments)
  return typeof res === "object" && res !== null ? res : obj
}
