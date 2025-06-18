// NOTE: 工厂模式，任务队列
class LazyMan {
  constructor(name) {
    this.name = name
    this.taskQueue = []
    this.taskQueue.push(() => {
      console.log('Hi I am ' + name)
      return Promise.resolve()
    })
    setTimeout(() => {
      this.runTask()
    }, 0)
  }
  eat = name => {
    this.taskQueue.push(() => {
      console.log('I am eating ' + name)
      return Promise.resolve()
    })
    return this
  }
  sleep = wait => {
    this.taskQueue.push(() => {
      console.log('等待' + wait + '秒...')
      return new Promise(r => setTimeout(r, wait * 1000))
    })
    return this
  }
  runTask = async () => {
    while (this.taskQueue.length) {
      await this.taskQueue.shift()()
    }
  }
}

// 工厂函数，方便调用
function createLazyMan(name) {
  return new LazyMan(name)
}
createLazyMan('Tony')
  .eat('breakfast')
  .sleep(3)
  .eat('lunch')
  .sleep(1)
  .eat('dinner')
// // 输出:
// // Hi I am Tony
// // I am eating breakfast
// // 等待3秒...
// // I am eating lunch
// // 等待1秒...
// // I am eating dinner
