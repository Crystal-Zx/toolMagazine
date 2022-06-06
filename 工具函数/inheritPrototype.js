// NOTE: 实现 寄生组合式继承
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

function inheritPrototype(Super, Sub) {
  const prototypeObj = create(Super.prototype)
  prototypeObj.constructor = Sub
  Sub.prototype = prototypeObj
}

module.exports = inheritPrototype
