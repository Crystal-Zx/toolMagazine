/**
 * NOTE: [ Medium ] [ leetcode - 1462 ] 课程表 IV（https://leetcode.cn/problems/course-schedule-iv）
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var checkIfPrerequisite = function (numCourses, prerequisites, queries) {
  const map = new Map(),
    inDegree = Array(numCourses).fill(0)
  prerequisites.forEach(([c1, c2]) => {
    // c1 -> c2
    const list = map.get(c1) ?? [] // list 是 c1 所有的后续课程列表
    inDegree[c2]++
    list.push(c2)
    map.set(c1, list)
  })

  // arr 用于记录课i 到 课j 是否可达
  const arr = Array.from({ length: numCourses }, () =>
    Array(numCourses).fill(false)
  )
  const queue = []
  inDegree.forEach((ind, idx) => !ind && queue.push(idx)) // 将所有入度为 0 的课程入队
  while (queue.length) {
    const c = queue.shift() // 先导课
    const postList = map.get(c) ?? [] // 该先导课的后续课程列表
    postList.forEach(postC => {
      arr[c][postC] = true
      // 如果「课h」是「课c」的先导课，那么「课h」就是「课postC」的先导课
      for (let h = 0; h < numCourses; ++h) {
        if (arr[h][c]) arr[h][postC] = true
      }
      inDegree[postC]--
      if (!inDegree[postC]) queue.push(postC)
    })
  }

  return queries.map(([c1, c2]) => arr[c1][c2])
}

console.log(
  checkIfPrerequisite(
    5,
    [
      [4, 3],
      [4, 1],
      [4, 0],
      [3, 2],
      [3, 1],
      [3, 0],
      [2, 1],
      [2, 0],
      [1, 0],
    ],
    [
      [1, 4],
      [4, 2],
      [0, 1],
      [4, 0],
      [0, 2],
      [1, 3],
      [0, 1],
    ]
  )
)
