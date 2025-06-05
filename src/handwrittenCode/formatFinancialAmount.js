const ROUNDING = {
  ROUND_HALF: 'ROUND_HALF',
  ROUND_CEIL: 'ROUND_CEIL',
  ROUND_FLOOR: 'ROUND_FLOOR'
}
/**
 * 将数字转换为金融金额格式
 * @param {number|string} value - 需要格式化的数字或数字字符串
 * @param {Object} [options] - 格式化选项
 * @param {string} [options.currency=''] - 货币符号
 * @param {number} [options.decimalDigits=2] - 小数位数
 * @param {ROUNDING} [options.rounding=ROUNDING.ROUND_HALF] - 小数舍入方案
 * @param {boolean} [options.negativeSignBeforeCurrency=false] - 负号是否放在货币符号之前
 * @returns {string} 格式化后的金额字符串
 */
function formatFinancialAmount(value, options = {}) {
  try {
    // 合并各参数值
    const {
      currency = '',
      decimalDigits = 2,
      rounding = ROUNDING.ROUND_HALF,
      negativeSignBeforeCurrency = false
    } = options

    // 处理非数字值: 转为 0 值对应格式
    if (isNaN(parseFloat(value)) || !isFinite(Number(value))) {
      return decimalDigits > 0
        ? `${currency}0${decimalSeparator}${'0'.repeat(decimalDigits)}`
        : `${currency}0`
    }

    // 分离整数部分和小数部分
    const [int = '', float = ''] = String(value).split('.')
    // -- 处理整数部分
    let intStr = ''
    let intNumber = Number(int)
    const isNegative = intNumber < 0
    intNumber = Math.abs(intNumber)
    while (intNumber > 1000) {
      intStr =
        ('000' + (intNumber % 1000)).slice(-3) +
        (intStr.length ? ',' : '') +
        intStr
      intNumber = Math.floor(intNumber / 1000)
    }
    if (intNumber) {
      intStr = intNumber + (intStr.length && ',') + intStr
    }

    // -- 处理小数部分
    let floatStr = ''
    if (decimalDigits && float) {
      const floatLen = float.length
      const pow = floatLen - decimalDigits
      let floatNumber = Number(float)
      floatNumber = floatNumber / Math.pow(10, pow)
      switch (rounding) {
        case ROUNDING.ROUND_HALF:
          floatStr = Math.round(floatNumber)
          break
        case ROUNDING.ROUND_CEIL:
          floatStr = Math.ceil(floatNumber)
          break
        case ROUNDING.ROUND_FLOOR:
          floatStr = Math.floor(floatNumber)
          break
        default:
          break
      }
    }
    floatStr += '0'.repeat(decimalDigits)
    floatStr.slice(0, decimalDigits)

    const returnValue = intStr + (floatStr ? `.${floatStr}` : '')
    const sign = isNegative ? '-' : ''
    let prefix = [currency, sign]
    if (negativeSignBeforeCurrency) {
      prefix.reverse()
    }

    return prefix.join('') + returnValue
  } catch (e) {
    return value // 转换失败时直接返回源数据
  }
}

console.log(
  formatFinancialAmount('2', {
    currency: '￥',
    decimalDigits: 2,
    // rounding: ROUNDING.ROUND_FLOOR,
    negativeSignBeforeCurrency: true
  })
)

// NOTE: 处理千分位分隔符还可以采用正则匹配
let str = '4451'
str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
console.log('--- 正则处理千分位分隔符结果：', str)

/**
 * 关于上述正则表达式的详细解释：
 * 1. \B：匹配一个非单词边界的位置。单词边界通常是字母、数字和下划线与其他字符之间的位置。这里使用 \B 是为了确保我们不在数字字符串的开头或结尾插入分隔符。
 * 2. (?=...)：这是一个正向先行断言（positive lookahead），表示匹配的位置后面必须满足 ... 的条件，但 ... 本身不会被消耗（即不会被包含在匹配结果中）。
 * 3. (\d{3})+：\d{3} 匹配恰好 3 个数字。(\d{3})+ 表示匹配一个或多个连续的 3 数字组。
 * 4. (?!\d)：这是一个负向先行断言（negative lookahead），表示匹配的位置后面不能是数字。确保我们只在完整的 3 数字组之后插入分隔符，而不是在数字中间。
 * 5. g：全局匹配标志，表示匹配所有满足条件的位置，而不仅仅是第一个。
 */

/** ----- NOTE: 下面是 DeepSeek 版本 */
export function formatFinancialAmount1(value, options = {}) {
  try {
    // 合并默认选项
    const {
      currency = '',
      decimalDigits = 2,
      thousandsSeparator = ',',
      decimalSeparator = '.',
      negativeSignBeforeCurrency = false
    } = options

    // 处理非数字值
    if (isNaN(parseFloat(value)) || !isFinite(Number(value))) {
      return decimalDigits > 0
        ? `${currency}0${decimalSeparator}${'0'.repeat(decimalDigits)}`
        : `${currency}0`
    }

    // 转换为数字并处理负数
    let number = Number(value)
    const isNegative = number < 0
    number = Math.abs(number)

    // 格式化小数部分
    const fixedNumber = number.toFixed(decimalDigits)
    const parts = fixedNumber.split('.')
    let integerPart = parts[0]
    let decimalPart = parts[1]

    // 添加千位分隔符
    if (thousandsSeparator) {
      integerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        thousandsSeparator
      )
    }

    // 构建最终格式
    let formattedAmount = integerPart

    // 只在需要时添加小数部分
    if (decimalDigits > 0 && decimalPart) {
      formattedAmount += `${decimalSeparator}${decimalPart}`
    }

    // 处理货币符号和负号位置
    if (isNegative) {
      formattedAmount = negativeSignBeforeCurrency
        ? `-${currency}${formattedAmount}`
        : `${currency}-${formattedAmount}`
    } else {
      formattedAmount = `${currency}${formattedAmount}`
    }

    return formattedAmount
  } catch (e) {
    return value
  }
}
