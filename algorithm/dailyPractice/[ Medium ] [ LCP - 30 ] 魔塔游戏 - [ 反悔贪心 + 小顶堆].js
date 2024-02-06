const MinHeap = require("../../dataStructure/Heap/minHeap")

/**
 * [ Medium ] [ LCP - 30 ] 魔塔游戏
 * @param {number[]} nums
 * @return {number}
 */
var magicTower = function (nums) {
  const sum = nums.reduce((prev, curr) => prev + curr)
  if (sum < 0) return -1

  let ans = 0
  let hp = 1
  let h = new MinHeap()
  for (let num of nums) {
    if (num < 0) h.push(num)
    hp += num
    if (hp < 1) {
      hp -= h.pop()
      ans++
    }
  }
  return ans
}

console.log(magicTower([100, 100, 100, -250, -60, -140, -50, -50, 100, 150]))
console.log(magicTower([-200, -300, 400, 0]))
