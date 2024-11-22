export const logger = func => {
  return function (set, get, store) {
    const setState = (...args) => {
      console.log('🚀 ~ setState called, state is changed to:', get())
      return set(...args)
    }

    return func(setState, get, store)
  }
}
