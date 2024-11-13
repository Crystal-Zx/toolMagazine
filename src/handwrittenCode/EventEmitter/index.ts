/** NOTE: 发布订阅模式 */

/** --- 监听器
 * 实现：on once emit off 以及订阅中心 Map<事件名, 事件处理函数[]>
 */
class Emitter implements EventEmitter {
  evtMap: Map<string, EventHandler[]>
  constructor() {
    this.evtMap = new Map()
  }

  on(evtName: string, handler: EventHandler) {
    const handlerArr = this.evtMap.get(evtName) ?? []
    handlerArr.push(handler)
    this.evtMap.set(evtName, handlerArr)
  }

  once(evtName: string, handler: EventHandler) {
    /**  --- 第一种 */
    // const onceHandler = function (...args: Parameters<EventHandler>) {
    //   let isCalled = false
    //   return () => {
    //     if (!isCalled) {
    //       handler.apply(this, args)
    //       isCalled = true
    //     }
    //   }
    // }
    // const handlerArr = this.evtMap.get(evtName) ?? []
    // handlerArr.push(onceHandler)
    // this.evtMap.set(evtName, handlerArr)
    /**  --- 第二种 */
    const onceHandler = (...args: any[]) => {
      handler(...args)
      this.off(evtName, onceHandler)
    }
    this.on(evtName, onceHandler)
  }

  emit(evtName: string, ...args: any[]) {
    const handlerArr = this.evtMap.get(evtName) ?? []
    if (!handlerArr.length) return
    handlerArr.forEach(handler => {
      handler(...args)
    })
  }

  /**
   * off
   * @description 取消事件监听
   * @param {string} evtName 事件名
   * @param {EventHandler} [handler] 事件处理函数，为空时删除 evtName 事件所有处理函数
   */
  off(evtName: string, handler?: EventHandler) {
    if (!handler) {
      this.evtMap.delete(evtName)
      return
    }
    const handlerArr = this.evtMap.get(evtName) ?? []
    if (!handlerArr.length) return
    handlerArr.splice(handlerArr.indexOf(handler) >>> 0, 1)
    this.evtMap.set(evtName, handlerArr)
  }
}

const emitter = new Emitter()
// emitter.on()
