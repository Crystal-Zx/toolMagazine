/** NOTE: 手写 zustand 状态管理库 */

import { useEffect, useState, useSyncExternalStore } from 'react'

/** --- Vanilla 版本：
 * 内置状态值：initialState state listeners
 * 暴露的 API：getInitialState getState setState subscribe destroy
 */
const createStore = createState => {
  const store = { getInitialState, getState, setState, subscribe, destroy }
  const initialState = createState(setState, getState, store)
  let state = initialState
  let listeners = new Set()

  // API
  function getInitialState() {
    return initialState
  }

  function getState() {
    return state
  }

  function setState(partial, replace = false) {
    // 获取更新值
    let nextState = typeof partial === 'function' ? partial(state) : partial

    // 前后两个 state 不一致时触发才更新
    if (Object.is(nextState, state)) return

    const previousState = state // 保存上一个 state
    if (replace) {
      state = nextState
    } else {
      state =
        typeof nextState !== 'object' || nextState === null
          ? nextState
          : Object.assign({}, state, nextState)
    }
    listeners.forEach(listener => listener(state, previousState))
  }

  function subscribe(listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  function destroy() {
    listeners.clear()
  }

  return store
}

// -- hook
const useStore = (api, selector) => {
  // const [, forceRender] = useState()
  // selector = selector ?? api.getState
  // useEffect(() => {
  //   api.subscribe((state, prevState) => {
  //     console.log('🚀 ~ api.subscribe ~ state:', state, prevState)
  //     const prevSelectedState = selector(prevState)
  //     const newSelectedState = selector(state)
  //     if (Object.is(prevSelectedState, newSelectedState)) return
  //     console.log('🚀 ~ api.subscribe ~ forceRender:')
  //     forceRender(Math.random())
  //   })
  // }, [])

  // return selector(api.getState())

  /** --- useSyncExternalStore 简化版
   * subscribe 函数，接受一个 callback，store 变化时触发 callback，React 会在合适的时机重新调用 getSnapshot 函数更新返回值，并重新渲染组件
   * getSnapshot 函数，返回实时的 store 切片
   */
  const getSnapshot = () => {
    const state = api.getState()
    return selector ? selector(state) : state
  }
  const snapshot = useSyncExternalStore(api.subscribe, getSnapshot)
  return snapshot
}

const create = createState => {
  // 创建 Vanilla 版本的 store，并获取返回的 api
  const store = createStore(createState)

  const useBoundStore = selector => useStore(store, selector)

  // 将 store 中的方法绑定到 useBoundStore
  Object.assign(useBoundStore, store)

  return useBoundStore
}

export { createStore, create }
