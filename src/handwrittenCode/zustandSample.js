// import { create } from 'zustand'

import { createStore, create } from './zustand'
import { logger } from './zustandMiddleware'

const bearStore = createStore((set, get, store) => ({
  age: 1,
  addAge: () => {
    set(state => ({ age: state.age + 1 }))
  },
  minusAge: () => {
    set(state => ({ age: state.age - 1 }))
  }
}))

const useBearStore = create(
  logger((set, get, store) => ({
    age: 1,
    addAge: () => {
      set(state => ({ age: state.age + 1 }))
    },
    minusAge: () => {
      set(state => ({ age: state.age - 1 }))
    }
  }))
)

export { bearStore, useBearStore }
