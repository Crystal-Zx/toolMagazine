// 全局变量，存储用户信息
const users = {
  values: ["Dean Edwards", "Alex Russell", "Dean Tom"],
}
// 全局方法，利用闭包实现函数重载
function addMethod(obj, name, fn) {
  let old = obj[name] // 存储上一个绑定的方法
  obj[name] = function () {
    // 添加绑定新的方法
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments)
    } else if (typeof old === "function") {
      return old.apply(this, arguments)
    }
  }
}

// 方法一：不传参数，直接返回 users.values
function fn0() {
  return this.values
}
// 方法二：传入一个参数作为 First Name，返回 users.values 中与传入参数值相同 First Name 的用户名数组
function fn1(firstName) {
  return this.values.filter(name => name.split(" ")[0] === firstName)
}
// 方法三：传入两个参数分别作为 First Name 和 Last Name，返回 users.values 中与传入参数值相同姓名的用户名数组
function fn2(firstName, lastName) {
  return this.values.filter(name => name === `${firstName} ${lastName}`)
}

/** 利用 addMethod 给 users 对象添加同名方法，实现函数重载 */
addMethod(users, "find", fn0)
addMethod(users, "find", fn1)
addMethod(users, "find", fn2)

/** 测试函数重载效果 */
console.log(users.find()) // [ 'Dean Edwards', 'Alex Russell', 'Dean Tom' ]
console.log(users.find("Dean")) // [ 'Dean Edwards', 'Dean Tom' ]
console.log(users.find("Dean", "Tom")) // [ 'Dean Tom' ]
