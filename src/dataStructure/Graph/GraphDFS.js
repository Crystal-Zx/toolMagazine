const { GraphAdjList, Vertex } = require("./GraphAdjList")

// NOTE: 图的深度优先搜索（图使用邻接表<Hash>实现），DFS 采用栈实现
function GraphDFS(graph, startVet) {
  const res = []
  if (!graph.size()) return res

  const stack = [startVet]
  const visitedSet = new Set([startVet])
  while (stack.length) {
    const head = stack.pop()
    res.push(head.val)
    for (let vet of graph.adjList.get(head) ?? []) {
      if (visitedSet.has(vet)) continue
      stack.push(vet)
      visitedSet.add(vet)
    }
  }
  return res
}

// TEST:
const v0 = new Vertex(0)
const v1 = new Vertex(1)
const v2 = new Vertex(2)
const v3 = new Vertex(3)
const v4 = new Vertex(4)
const v5 = new Vertex(5)
const v6 = new Vertex(6)
const graph = new GraphAdjList([
  [v0, v1],
  [v0, v3],
  [v1, v2],
  [v2, v5],
  [v4, v5],
  [v5, v6],
])
console.log(graph.adjList)
console.log(GraphDFS(graph, v0))

// NOTE: 在非连通图中，从某个顶点出发，至少有一个顶点无法到达。遍历非连通图需要设置多个起点，以遍历到图的所有连通分量。
