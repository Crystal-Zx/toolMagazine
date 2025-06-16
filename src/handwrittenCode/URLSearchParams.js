function getURLSearchParams(url) {
  const searchStr = /.+\?(.+)$/.exec(url)[1]
  const searchArr = searchStr.split('&')
  let searchParams = {}
  for (let item of searchArr) {
    if (/=/.test(item)) {
      // 有 value 的 key
      let [key, val] = item.split('=')
      // 进一步处理 val 的类型
      val = decodeURIComponent(val) // 解析
      if (/^\d+$/.test(val)) {
        val = parseFloat(val)
      }
      if (searchParams.hasOwnProperty(key)) {
        searchParams[key] = [].concat(searchParams[key], val)
      } else {
        searchParams[key] = val
      }
    } else {
      searchParams[key] = true
    }
  }
  return searchParams
}
console.log(
  getURLSearchParams(
    'https://hotsign.com/ltd?token=fewferfjergjke&lang=zh&token=dcsfgtre'
  )
)
