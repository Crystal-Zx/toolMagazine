import { useCallback, useRef, useState } from 'react'

const useLock = asyncFn => {
  const asyncFnRef = useRef(null)
  asyncFnRef.current = asyncFn
  const [isLocking, setIsLocking] = useState(false)

  const handleLock = useCallback(
    async (...params) => {
      if (isLocking) return
      setIsLocking(true)
      try {
        const res = await asyncFnRef.current(...params)
        return res
      } catch (e) {
        e?.message && console.log(e)
      } finally {
        setIsLocking(false)
      }
    },
    [isLocking, asyncFn]
  )

  return [isLocking, handleLock]
}

export default useLock
