interface EventHandler {
  (...args: any[]): void
}

interface EventEmitter {
  evtMap: Map<string, Function[]>
  on: (evtName: string, handler: EventHandler) => void // 订阅某事件
  once: (evtName: string, handler: EventHandler) => void // 仅触发一次的订阅
  emit: (evtName: string, ...args: any[]) => void // 派发事件
  off: (evtName: string, handler?: EventHandler) => void // 移除某事件的指定或全部监听器
}
