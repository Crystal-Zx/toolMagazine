const MaxHeap = require("../../dataStructure/Heap/maxHeap")

/**
 * NOTE: [ Hard ] [ leetcode - 630 ] 课程表 III（https://leetcode.cn/problems/course-schedule-iii）
 * @param {number[][]} courses
 * @return {number}
 */
var scheduleCourse = function (courses) {
  courses.sort((a, b) => a[1] - b[1])

  let day = 0
  const maxHeap = new MaxHeap()
  for (let [duration, lastDay] of courses) {
    if (day + duration <= lastDay) {
      maxHeap.push(duration)
      day += duration
    } else if (!maxHeap.isEmpty() && duration < maxHeap.peek()) {
      // 反悔
      day -= maxHeap.pop() - duration
      maxHeap.push(duration)
    }
  }
  return maxHeap.size()
}

console.log(
  scheduleCourse([
    [100, 200],
    [200, 1300],
    [1000, 1250],
    [2000, 3200],
  ])
)
console.log(scheduleCourse([[1, 2]]))
console.log(
  scheduleCourse([
    [3, 2],
    [4, 3],
  ])
)
console.log(
  scheduleCourse([
    [7, 17],
    [3, 12],
    [10, 20],
    [9, 10],
    [5, 20],
    [10, 19],
    [4, 18],
  ])
)
