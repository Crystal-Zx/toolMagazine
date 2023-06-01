/**
 * call绑定的模拟实现
 * 1. 实现的功能：
 * 1.1 绑定 this 的指向；
 * 1.2 接收传入的参数并将它们作为形参执行函数或方法
 * 2. 需要注意的点：
 * 2.1 当未传入任何参数时，即 this 的绑定对象为 null 时，函数调用的 this 指向全局对象 window
 * 2.2 函数可以有返回值
 * 实现思路：
 * 将被调用的函数保存到 thisValue 指向对象的属性中并调用，即可用对象本身作为函数调用的 this，并访问到对象中的其他可访问属性的值。待被调用的函数执行完毕后再把它从 thisValue 的对象中删除。
 */

/**
 *
 * @param {*} context 被绑定的 thisValue 值
 */
/** NOTE: 可以使用 剩余参数接收传入 _call 的除 context 外的所有形参，再在函数调用时通过(...args)传递给调用函数。但由于此处已经是模拟实现 call (ES3的语法) ，不推荐使用 ES6 及以上的写法来实现 */
Function.prototype._call = function (context) {
  console.log("===arguments", arguments) // args 为数组

  // Object(context) 将 context 装箱，即如果 context 是原始类型则将其包装成对象
  context = context ? Object(context) : window // 实现 2.1

  // 将调用函数的值赋值给对象的属性，绑定 this 指向
  context.fn = this
  // 初始化参数列表
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]") // 使用字符串拼接而非模板字符串，因为后者也是 es6 的语法
  }

  var res = eval("context.fn(" + args + ")") // 此处 args 会隐式调用 Array.toString() 方法。 args.toString() --> "arguments[0],argument[1],arguments[2]"
  delete context.fn
  return res
}

// 以下为功能测试代码：
var foo = {
  value: 1,
}

function bar(name, age) {
  console.log("===this", this)
  console.log("===name", name)
  console.log("===age", age)
  console.log("===this.value", this.value)
}

bar._call()
// bar._call(foo, "kevin", 18)
// kevin
// 18
// 1
