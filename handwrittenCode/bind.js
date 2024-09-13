/**
 * bind 函数的模拟实现
 * 1. 方法定义
 * bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 * 2. 实现的要素
 * 2.1 返回一个函数
 * 2.2 接受参数
 * 3. 需要注意的点
 * 3.1 在调用 bind 时可以传入部分参数，在它返回的函数被调用时可再次传入剩余参数
 * 3.2 bind 返回的函数称为绑定函数，它也能通过 new 操作符创建对象，而 new 绑定的对象会将 this 指向生成的实例对象。此时，bind 返回的绑定函数会丢失 this 值。需要注意的是，这个 new 生成的实例对象可以通过原型链访问到调用函数（即 bind 的调用函数）原型链上的属性和方法，故需要再手写中处理好此点。
 */
Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not a callable"
    )
  }
  var self = this
  // 获取参数列表：获取第二个至最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () {}
  var fBound = function () {
    // 获取调用绑定函数时的参数
    var bindArgs = Array.prototype.slice.call(arguments)

    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  // 举个例子： bar.prototype.a = 1; var bindFoo = bar._bind(...); var obj = new bindFoo(); 之后 obj.a 可以访问到 bar 原型对象上的属性和方法
  /**
   * NOTE: 但这里需要有一点改进：不能让 fBound.prototype 与 this.prototype 直接共享同一内存，这会导致修改 fBound.prototype 的时候将 this.prototype 的值一起修改掉。
   * 最佳的做法是：创建一个空函数 fNOP 作为“中转站”，将它的原型对象 fNOP.prototype 与 this.prototype 共享同一内存，然后将 fBound.prototype 作为 fNOP 构造函数的一个实例。这样 fBound.prototype 就能通过原型链访问 fNOP.prototype（即：this.prototype），而后续若修改 fBound.prototype 会因为属性屏蔽的原因在其自己的原型对象上重新创建一个同名属性并进行赋值，就不会影响到 this.prototype 的同名属性值了。
   *  */
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
// 另一种替代中转函数的写法
Function.prototype._bind2 = function (thisArg) {
  const self = this
  if (typeof self !== "function") {
    throw TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    )
  }

  const args = [].shift.call(arguments) ?? []

  function fBound() {
    const bindArgs = [...arguments]
    return self.apply(this instanceof fBound ? this : thisArg, [
      ...args,
      bindArgs,
    ])
  }
  fBound.prototype = Object.create(self.prototype)
  return fBound
}

// 以下为功能测试代码：
var value = 2
var foo = {
  value: 1,
}
function bar(name, age) {
  // this.habit = 'shopping';
  console.log("==> bar this.value", this.value)
  console.log("==> bar name", name)
  console.log("==> bar age", age)
  return "bar execute over"
}
bar.prototype.friend = "kevin"
var bindFoo = bar._bind1(foo, "daisy")
console.log("===bindFoo", bindFoo())
console.log("===new绑定执行后：")
var obj = new bindFoo("18")
console.log("===obj", obj.friend)

/**
 * WARNING: 关于旧版（2018年3月之前）的MDN上关于 apply 实现这一块加上对 context 的判断：
 * self.apply(this instanceof self ? this : context || this) 是错误的！
 * 这一个例子中：
 * foo.bar 的值是 bar.bind(null) 为一个新生成的绑定函数 fBound， 其内部的 this 的指向为 foo
 * bar.bind(null) 的值是： function fBound () { return bar.apply(this instanceof bar ? this : context || this) }，其中 this -> foo
 * 执行 foo.bar() 即执行 上一步中的函数 fBound ，会得到： bar.apply(foo instanceof bar ? foo : context || foo)
 * foo instanceof bar ? foo : context || foo 执行的结果是：context || foo
 * 当 context 为空时， bar.apply(foo) ===> 打印结果 1
 * 但是，事实是正确的打印结果是 2，即实际上执行的是： bar.apply(null)。在非严格模式下，调用函数 bar 的 this 指向为 null 时会自动指向全局。
 */
// var value = 2
// var foo = {
//   value: 1,
//   bar: bar.bind(null),
//   // bar: function () { console.log(this.value) }  // 1
// }
// function bar() {
//   console.log(this.value)
// }
// foo.bar()
