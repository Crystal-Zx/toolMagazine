/**
 * Convert file size from one unit to another unit.
 *
 * @param {number} size The size of file in bytes.
 * @param {string} fromUnit The unit of size. Can be B, KB, MB, GB, TB.
 * @param {string} toUnit The unit to convert to. Can be B, KB, MB, GB, TB.
 * @param {number} [decimalPoint=2] The number of decimal point.
 * @returns {number} The size of file in the converted unit.
 */
function convertFileSize(size, fromUnit, toUnit, decimalPoint = 2) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  // 抹平大小写，并检查单位是否合法
  const fromUnitIdx = units.indexOf(fromUnit.toUpperCase())
  const toUnitIdx = units.indexOf(toUnit.toUpperCase())
  if (fromUnitIdx === -1 || toUnitIdx === -1) {
    throw new Error('Invalid units')
  }

  // 计算初始单位与目标单位之间的转换系数
  const exponent = toUnitIdx - fromUnitIdx
  // 目标单位较小，进行乘法运算, 较大则进行除法，可以合并乘法和除法为单一公式
  const resultSize = size * Math.pow(1024, -exponent)

  // 返回格式化后的结果，如果需要保留0，则不使用parseFloat
  return parseFloat(resultSize.toFixed(decimalPoint)) + ' ' + toUnit
}

// TEST:
console.log(convertFileSize(1, 'GB', 'MB')) // 输出: 1024 MB
console.log(convertFileSize(1, 'MB', 'KB')) // 输出: 1024 KB
console.log(convertFileSize(1, 'KB', 'B')) // 输出: 1024 B
console.log(convertFileSize(1, 'MB', 'GB', 4)) // 输出: 0.001 GB
console.log(convertFileSize(1, 'TB', 'GB', 4)) // 输出: 1024 GB
console.log(convertFileSize(1, 'TB', 'MB', 4)) // 输出: 1048576 MB
