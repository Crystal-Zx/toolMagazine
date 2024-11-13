const ImmediatePriority = 1 // 立即执行的优先级, 级别最高 [点击事件，输入框，]
const UserBlockingPriority = 2 // 用户阻塞级别的优先级, [滚动，拖拽这些]
const NormalPriority = 3 // 正常的优先级 [redner 列表 动画 网络请求]
const LowPriority = 4 // 低优先级 [分析统计]
const IdlePriority = 5 // 最低阶的优先级, 可以被闲置的那种 [console.log]

const getCurrentTime = () => performance.now()
class SimpleScheduler {
  constructor() {
    /**
     * { callback, priorityLevel, expirationTime }
     */
    this.taskQueue = []
    this.performingWork = false // 任务执行锁。是否正在工作，防止重复调度
    const channel = new MessageChannel()
    this.port = channel.port2 // 发消息
    channel.port1.onmessage = this.performWorkUntilDeadline.bind(this) // 接收消息
  }

  /**
   * 调度任务
   * @param {优先级} priorityLevel
   * @param {回调函数} callback
   */
  scheduleCallback(priorityLevel, callback) {
    const currentTime = getCurrentTime()
    let timeout
    // 根据优先级设置超时时间
    switch (priorityLevel) {
      case ImmediatePriority:
        timeout = -1
        break
      case UserBlockingPriority:
        timeout = 250
        break
      case LowPriority:
        timeout = 10000
        break
      case IdlePriority:
        timeout = 1073741823 // 32位操作系统V8引擎最大时间
        break
      case NormalPriority:
      default:
        timeout = 5000
        break
    }

    const task = {
      priorityLevel,
      callback,
      expirationTime: currentTime + timeout
    }
    this.#push(task)
    this.schedulePerformWorkUntilDeadline()
  }

  schedulePerformWorkUntilDeadline() {
    if (this.performingWork) return
    this.port.postMessage(null) // 触发消息
  }

  performWorkUntilDeadline() {
    this.performingWork = true
    this.workLoop()
    this.performingWork = false
  }

  /**
   * 执行任务
   */
  workLoop() {
    let currentTask = this.#peak()
    while (currentTask) {
      const cb = currentTask.callback
      typeof cb === 'function' && cb()
      this.#pop()
      currentTask = this.#peak()
    }
  }

  /**
   * 先使用队列完成，更优化的解法是使用小顶堆来实现任务队列
   * @param {新调度任务} task
   */
  #push(task) {
    this.taskQueue.push(task)
    // 按过期时间排序，时间越小优先级越高
    this.taskQueue.sort((a, b) => a.expirationTime - b.expirationTime)
  }
  #peak() {
    return this.taskQueue[0] || null
  }
  #pop() {
    return this.taskQueue.shift()
  }
}

// TEST:
const scheduler = new SimpleScheduler()
scheduler.scheduleCallback(UserBlockingPriority, () => {
  console.log(UserBlockingPriority)
})
scheduler.scheduleCallback(ImmediatePriority, () => {
  console.log(ImmediatePriority)
})
scheduler.scheduleCallback(IdlePriority, () => {
  console.log(IdlePriority)
})
scheduler.scheduleCallback(LowPriority, () => {
  console.log(LowPriority)
})
scheduler.scheduleCallback(NormalPriority, () => {
  console.log(NormalPriority)
})
