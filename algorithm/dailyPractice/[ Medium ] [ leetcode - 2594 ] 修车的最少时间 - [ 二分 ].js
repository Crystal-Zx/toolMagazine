/**
 * NOTE: [ Medium ] [ leetcode - 2594 ] 修车的最少时间（https://leetcode.cn/problems/minimum-time-to-repair-cars）
 * @param {number[]} ranks
 * @param {number} cars
 * @return {number}
 */
var repairCars = function (ranks, cars) {
  let left = 0
  let right = ranks[0] * cars * cars
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    const totalCars = ranks.reduce((prev, curr) => {
      return prev + Math.floor(Math.sqrt(mid / curr))
    }, 0)

    if (totalCars >= cars) right = mid
    else left = mid + 1
  }
  return left
}

console.log(repairCars([4, 2, 3, 1], 10))
