/** NOTE: 发布订阅模式 */

/** --- 监听器
 * 实现：on once emit off 以及订阅中心 Map<事件名, 事件处理函数[]>
 */
class Emitter implements IEmitter {
  evtMap: Map<string, Function[]>
  constructor() {
    this.evtMap = new Map()
  }

  on() {}

  once() {}

  emit() {}

  off() {}
}

const emitter = new Emitter()
// emitter.on()
