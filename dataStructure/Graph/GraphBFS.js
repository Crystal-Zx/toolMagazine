const { GraphAdjList, Vertex } = require("./GraphAdjList")

// NOTE: 图的广度优先搜索（图使用邻接表<Hash>实现）
function graphBFS(graph, startVet) {
  const res = []
  if (!graph.size()) return res

  const visitedSet = new Set() // 用于记录已被访问过的顶点
  const queue = [startVet]
  visitedSet.add(startVet)
  while (queue.length) {
    const head = queue.shift()
    res.push(head.val)
    const vets = graph.adjList.get(head) ?? []
    for (let vet of vets) {
      if (visitedSet.has(vet)) continue
      queue.push(vet)
      visitedSet.add(vet)
    }
  }
  return res
}

const v0 = new Vertex(0)
const v1 = new Vertex(1)
const v2 = new Vertex(2)
const v3 = new Vertex(3)
const v4 = new Vertex(4)
const v5 = new Vertex(5)
const v6 = new Vertex(6)
const v7 = new Vertex(7)
const v8 = new Vertex(8)
const graph = new GraphAdjList([
  [v0, v1],
  [v0, v3],
  [v1, v2],
  [v1, v4],
  [v2, v5],
  [v3, v4],
  [v3, v6],
  [v4, v5],
  [v4, v7],
  [v5, v8],
  [v6, v7],
  [v7, v8],
])

console.log(graphBFS(graph, v0))

/* [复杂度分析](https://www.hello-algo.com/chapter_graph/graph_traversal/#_2) */
// 时间复杂度： 所有顶点都会入队并出队一次，使用 O(|V|) 时间；在遍历邻接顶点的过程中，由于是无向图，因此所有边都会被访问 2 次，使用 时间；总体使用 O(|V| + |E|) 时间。
// 空间复杂度：列表 res ，哈希表 visited ，队列 que 中的顶点数量最多为 |V|，使用 O(|V|) 空间。
