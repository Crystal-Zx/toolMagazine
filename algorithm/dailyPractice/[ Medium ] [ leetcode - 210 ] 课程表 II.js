/**
 * NOTE: [ Medium ] [ leetcode - 210 ] 课程表 II（https://leetcode.cn/problems/course-schedule-ii）
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  const map = new Map(), inDegree = Array(numCourses).fill(0)
  // 1. 生成有向无环图的邻接表 及 所有顶点的入度值
  for(let [c1,c2] of prerequisites) {
    let val = [c1]
    if(map.has(c2)) {
      val = map.get(c2)
      val.push(c1)
    }
    map.set(c2, val)
    inDegree[c1]++
  }

  // 2. BFS: 将所有入度为0的依次入队，之后出队一个将其涉及的顶点入度值减一
  const queue = [], ans = []
  inDegree.forEach((ind, idx) => !ind && queue.push(idx))

  while(queue.length) {
    const c = queue.shift()
    ans.push(c)  // 记录当前完成的课程

    // 处理 c 课程涉及的下一课程的入度值
    const list = map.get(c)
    if(list && list.length) {
      list.forEach((c, idx) => {
        inDegree[c]--
        if(!inDegree[c]) queue.push(c)
      })
    }
  }

  return ans.length === numCourses ? ans : []
};
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))
// console.log(findOrder(6, [[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]]))