const { default: axios } = require('axios')
const { useState, useEffect } = require('react')

/**
 * NOTE:
 * const { loading, error, data } = useRequest(url) // 可只考虑 get 请求
 */
function useRequest(url) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const didMounted = true // 防止请求竞态造成结果错误及在已卸载组件上 setState
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        if (didMounted) setData(result)
      } catch (e) {
        if (didMounted) setError(e)
      } finally {
        if (didMounted) setLoading(false)
      }
    }

    url && fetchData()

    return () => {
      didMounted = false
    }
  }, [url])

  return { loading, error, data }
}
