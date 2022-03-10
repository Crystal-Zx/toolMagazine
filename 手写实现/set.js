/**
 * ES6 Set 的模拟实现
 * 1. Set 本身是一个构造函数，可接受一个数组或其他具有 iterator 接口的数据结构作为参数进行初始化
 * 2. 操作方法：
 *  2.1 add(value)      添加某个值，返回 Set 结构本身
 *  2.2 delete(value)   删除某个值，返回一个布尔值，表示删除是否成功
 *  2.3 has(value)      检查某个值是否在 Set 结构内容内，返回一个布尔值
 *  2.4 clear           清空 Set 结构，无返回值
 * 3. 遍历方法：
 *  3.1 keys()          返回键名的遍历器
 *  3.2 values()        返回键值的遍历器
 *  3.3 entries()       返回键值对的遍历器
 *  3.4 forEach()       使用回调函数遍历每个成员，无返回值。回调函数接受三个参数： value / key / set 实例本身
 * 4. 属性
 *  4.1 Set.prototype.constructor  构造函数，默认就是 Set 函数
 *  4.2 Set.prototype.size         返回 Set 实例的成员个数（？？？）
 *  */ 

// 以下代码适用于在 node 环境下运行。
(function () {
  const _global = this  // 此时的 this 指向 node 的全局对象 global
  // NOTE: 对 NaN 值的额外处理
  const NaNSymbol = Symbol('NaN')
  function encodeVal(value) {
    return value !== value ? NaNSymbol : value
  }
  function decodeVal(value) {
    return (value === NaNSymbol) ? NaN : value  // 运算符优先级：严格相等 > 三目运算，故个人感觉不用加括号改变优先级
  }
  // 模拟实现 for-of
  function forOf(obj, cb) {
    if(typeof obj[Symbol.iterator] !== 'function') throw new TypeError(`${obj} is not iterable`)
    if(typeof cb !== 'function') throw new TypeError('cb must be callable')

    let iterator = obj[Symbol.iterator]()
    let result   = iterator.next()
    while(!result.done) {
      cb(result.value)
      result = iterator.next()
    }
  }
  function makeIterator(values, iterator) {
    var idx = 0

    // new Set1(new Set1()) 会调用这里
    var obj = {
      next: function() {
        return idx < values.length ? { value: iterator(values[idx++]), done: false } : { value: void 0, done: true }
      }
    }

    // [...set.keys()] 会调用这里
    obj[Symbol.iterator] = function() {
      return obj
    }

    return obj
  }
  // 创建遍历的迭代器
  // function setIterator()

  function Set(data) {
    this._values = []
    this.size = 0
    forOf(data, item => this.add(item))
  }
  Set.prototype.add = function(value) {
    value = encodeVal(value)
    if(this._values.indexOf(value) === -1) {
      this._values.push(value)
      ++this.size
    }
    return this
  }
  Set.prototype.delete = function(value) {
    const idx = this._values.indexOf(encodeVal(value))
    if(idx === -1) return false
    
    this._values.splice(idx, 1)
    --this.size
    return true
  }
  Set.prototype.has = function(value) {
    return this._values.indexOf(encodeVal(value)) !== -1
  }
  Set.prototype.clear = function() {
    this._values = []
    this.size = 0
  }
  Set.prototype.forEach = function(cb, thisArg) {
    thisArg = thisArg || _global
    for(var i = 0, len = this._values.length; i < len; i++) {
      cb.call(thisArg, decodeVal(this._values[i]), decodeVal(this._values[i]), this)
    }
  }
  Set.prototype.keys = Set.prototype.values = function() {  // 返回一个迭代器对象，内部是 键值/键名
    return makeIterator(this._values, (value) => decodeVal(value))
  }
  Set.prototype.entries = function() {
    return makeIterator(this._values, (value) => [decodeVal(value), decodeVal(value)])
  }
  Set.prototype[Symbol.iterator] = function() {
    return this.values()
  }
  Set.length = 0  // length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。
  _global.Set1 = Set
})()

// let set = new Set1([1, NaN, 3, NaN, 3]);
// console.log(set); // 4
// set.forEach((value, key, set) => {
// 	console.log(value, key, set.size)
// });

const set1 = new Set1([2,3,4])
console.log(set1, set1.keys(), [...set1.keys()])

let set = new Set1(new Set1([1, 2, 3]));
console.log(set.size); // 3

console.log([...set.keys()]); // [1, 2, 3]
console.log([...set.values()]); // [1, 2, 3]
console.log([...set.entries()]); // [1, 2, 3]