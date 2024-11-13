/**
 * 
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  const inDegree = Array(numCourses).fill(0)  // 入度数组
  const map = new Map()
  for(let [c1, c2] of prerequisites) {
    inDegree[c1]++
    let c = map.get(c2)
    c = (c || [])
    c.push(c1)
    map.set(c2, c)
  }
  
  // BFS 依次将入度为 0 的课入队
  const queue = [], res = []
  inDegree.forEach((d, idx) => !d && queue.push(idx))

  let count = 0
  while(queue.length) {
    const c = queue.shift()
    res.push(c)
    count++
    const list = map.get(c)
    if(list && list.length) {
      list.forEach(c => {
        inDegree[c]--
        !inDegree[c] && queue.push(c)
      })
    }
  }

  console.log(res)
  return count === numCourses
};
console.log(canFinish(6, [[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]]))