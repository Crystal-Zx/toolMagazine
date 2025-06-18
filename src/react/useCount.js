/**
 * NOTE: 计数 Hook
 * count 从 0 计数，每一秒 +1 （可使用 setInterval）
 * const { count } = useCount()
 */

const { useEffect, useState } = require('react')

function useCount() {
  const [cnt, setCnt] = useState(0)
  useEffect(() => {
    let timer = setInterval(() => setCnt(c => c + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  return { cnt }
}
