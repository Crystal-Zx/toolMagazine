// NOTE: 模拟一个红绿灯变化，红灯 1 秒，绿灯 1 秒，黄灯 1 秒，然后循环
function trafficLight() {
  function lighting(name, delay) {
    return new Promise(r => {
      setTimeout(() => {
        console.log(name)
        r()
      }, delay)
    })
  }
  function start() {
    return Promise.resolve()
      .then(() => lighting('red', 1000))
      .then(() => lighting('green', 1000))
      .then(() => lighting('yellow', 1000))
      .finally(start)
  }
  start()
}

trafficLight()
