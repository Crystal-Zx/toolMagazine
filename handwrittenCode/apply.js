/**
 * apply 和 call 的区别仅在于接受的参数不同：
 * call：第一个参数接受一个作为函数上下文的对象，从第二个参数到最后一个参数作为函数的参数列表
 * apply：第一个参数接受一个作为函数上下文的对象，第二个参数时作为函数参数所组成的 数组 或 类数组对象
 **/

Function.prototype._apply = function (context, arr) {
  context = context ? Object(context) : window

  context.fn = this
  // 初始化参数列表
  if (!arr) {
    return context.fn()
  }

  // 初始化参数列表
  // NOTE: 虽然 apply 接收一个数组类型的参数列表，但采用 eval 时传入 ‘kevin' 会被识别成一个变量，会导致报错： ReferenceError: Kevin is not defined
  var args = []
  for (var i = 0, len = arr.length; i < len; i++) {
    args.push("arr[" + i + "]")
  }
  console.log(args, arr)
  res = eval("context.fn(" + args + ")")

  delete context.fn
  return res
}

// 以下为功能测试代码：
var foo = {
  value: 1,
}

function bar(name, age) {
  console.log("===name", name)
  console.log("===age", age)
  console.log("===this.value", this.value)
}

bar._apply(foo, ["kevin", 18])
// kevin
// 18
// 1
