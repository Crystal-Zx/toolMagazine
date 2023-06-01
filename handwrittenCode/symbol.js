(function () {  // 函数自调用，将变量受限在此作用域内
  var root = this

  var generateName = (function () { // 闭包
    var postfix = 0
    return function (descString) {
      return `${descString}_${postfix++}`
    }
  })()

  var SymbolPolyfill = function Symbol(desc) {

    // 2. 不能使用 new 
    if(this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor')

    // 5. 如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串
    const descString = desc === undefined ? undefined : desc.toString()
    
    // 8. 显式转换为 String
    var symbol = Object.create({
      toString: function () {
        return `Symbol(${this.__Name__})`
      }
    })

    Object.defineProperties(symbol, {
      '__Description__': {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '__Name__': {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    // 6. 返回一个新对象，保证 Symbol 的唯一性
    return symbol
  }

  var forMap = {}
  Object.defineProperties(SymbolPolyfill, {
    'for': {
      value: function (desc) {
        var descString = desc === undefined ? undefined : desc.toString()
        
        return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString)
      },
      writable: true,
      enumerable: false,
      configurable: true
    },
    'keyFor': {
      value: function (symbol) {
        for(var key in forMap) {
          if(forMap[key] === symbol) return key
        }
      }
    }
  })

  root.SymbolPolyfill = SymbolPolyfill
})()

var s1 = SymbolPolyfill.for('foo')
console.log(SymbolPolyfill.keyFor(s1))
var s2 = SymbolPolyfill('foo')
console.log(SymbolPolyfill.keyFor(s2))