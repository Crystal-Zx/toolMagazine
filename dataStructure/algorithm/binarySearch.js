const createFib = require("./fibonacci")
// NOTE: 二分查找

const fibArr = createFib(10)

// -- 迭代

// -- 递归
function binarySearch(arr, num) {
  let low = 0,
    high = arr.length - 1,
    mid = Math.ceil(high / 2)

  if (arr[mid] < num) {
    high = mid - 1
    mid = Math.ceil(high / 2)
  } else if (arr[mid] > num) {
    low = mid + 1
    mid = Math.ceil((high - low) / 2)
  } else {
    return
  }
  console.log(low, mid, high)
}
console.log(fibArr)
console.log(binarySearch(fibArr, 18))
