var Singleton = function (name) {
  this.name = name
}

Singleton.prototype.getName = function () {
  return this.name
}

var ProxySingleton = (function () {
  var instance

  return function (name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()

const a = new ProxySingleton('a')
const b = new ProxySingleton('b')
console.log(a === b)
console.log(a.getName())
console.log(b.getName())
