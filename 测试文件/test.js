var findNumberIn2DArray = function (matrix, target) {
  let x = 0,
    y = 0
  while (x < matrix.length) {
    console.log(x, y, matrix[x][y])
    if (matrix[x][y] === target) {
      return true
    } else if (matrix[x][y] < target && y < matrix[0].length) {
      y++
    } else {
      //  if(matrix[x][y] > target || y >= matrix[0].length)
      y = y - 1
      x = x + 1
    }
  }
  return false
}

let arr = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
]

console.log(findNumberIn2DArray(arr, 21))
