// NOTE: 顶点类
class Vertex {
  constructor(val) {
    this.val = val
  }
}

// NOTE: 基于邻接表（Hash）实现的无向图
class GraphAdjList {
  adjList

  /**
   * 构造函数
   * @param {Array} edges 边列表[[vet实例, vet实例]]
   */
  constructor(edges) {
    this.adjList = new Map()
    for (let [vet1, vet2] of edges) {
      this.addVertex(vet1)
      this.addVertex(vet2)
      this.addEdge(vet1, vet2)
    }
  }

  size() {
    return this.adjList.size
  }

  /* 添加顶点 */
  addVertex(vet) {
    if (this.adjList.has(vet)) return
    this.adjList.set(vet, [])
  }

  /* 删除顶点 */
  removeVertex(vet) {
    if (!this.adjList.has(vet)) throw new Error("Illegal Argument Exception")

    this.adjList.delete(vet)
    for (let vets of this.adjList.values()) {
      const idx = vets.indexOf(vet)
      if (idx !== -1) vets.splice(idx, 1)
    }
  }

  /* 添加边（i , j 为 顶点对应索引） */
  addEdge(vet1, vet2) {
    if (!this.adjList.has(vet1) || !this.adjList.has(vet2) || vet1 === vet2)
      throw new Error("Illegal Argument Exception")

    this.adjList.get(vet1).push(vet2)
    this.adjList.get(vet2).push(vet1)
  }

  /* 删除边 */
  removeEdge(vet1, vet2) {
    if (!this.adjList.has(vet1) || !this.adjList.has(vet2) || vet1 === vet2)
      throw new Error("Illegal Argument Exception")

    this.adjList.get(vet1).splice(this.adjList.get(vet1).indexOf(vet2), 1)
    this.adjList.get(vet2).splice(this.adjList.get(vet2).indexOf(vet1), 1)
  }

  /* 打印邻接矩阵 */
  print() {
    console.log("邻接表 =")
    for (const [key, value] of this.adjList) {
      const tmp = []
      for (const vertex of value) {
        tmp.push(vertex.val)
      }
      console.log(key.val + ": " + tmp.join())
    }
  }
}

// TEST:
const v1 = new Vertex(1)
const v3 = new Vertex(3)
const v2 = new Vertex(2)
const v5 = new Vertex(5)
const v4 = new Vertex(4)
const graph = new GraphAdjList([
  [v1, v5],
  [v1, v3],
  [v2, v5],
  [v2, v3],
  [v4, v5],
  [v4, v2],
])
graph.print()
console.log(graph.adjList)

module.exports = {
  GraphAdjList,
  Vertex,
}
