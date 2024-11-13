// NOTE: 基于邻接矩阵实现的无向图
class GraphAdjMatrix {
  vertices
  adjMat = []

  /**
   * 构造函数
   * @param {Array} vertices 顶点列表
   * @param {Array} edges 边列表
   */
  constructor(vertices, edges) {
    this.vertices = []
    this.adjMat = []
    for (let vertex of vertices) {
      this.addVertex(vertex)
    }
    for (let [i, j] of edges) {
      this.addEdge(i, j)
    }
  }

  size() {
    return this.vertices.length
  }

  /* 添加顶点 */
  addVertex(val) {
    const n = this.size()
    // 添加新顶点
    this.vertices.push(val)
    // 新增一行（先新增行再新增列，保证新增行也有 n + 1 个元素）
    this.adjMat.push(new Array(n).fill(0))
    // 新增一列
    for (const row of this.adjMat) {
      row.push(0)
    }
  }

  /* 删除顶点 */
  removeVertex(idx) {
    // 先检查顶点下标 idx 是否越界
    if (idx > this.size() || idx < 0)
      throw new RangeError("Index Out Of Bounds Exception")
    // 删除顶点相关操作
    this.vertices.splice(idx, 1)
    this.adjMat.splice(idx, 1)
    for (let row of this.adjMat) {
      row.splice(idx, 1)
    }
  }

  /* 添加边（i , j 为 顶点对应索引） */
  addEdge(i, j) {
    const n = this.size()
    // 索引越界和相等时的处理
    if (i < 0 || i >= n || j < 0 || j >= n || i === j) {
      throw new RangeError("Index Out Of Bounds Exception")
    }

    this.adjMat[i][j] = 1
    this.adjMat[j][i] = 1
  }

  /* 删除边 */
  removeEdge(i, j) {
    const n = this.size()
    // 索引越界和相等时的处理
    if (i < 0 || i >= n || j < 0 || j >= n || i === j) {
      throw new RangeError("Index Out Of Bounds Exception")
    }

    this.adjMat[i][j] = 0
    this.adjMat[j][i] = 0
  }

  /* 打印邻接矩阵 */
  print() {
    console.log("顶点列表 = ", this.vertices)
    console.log("邻接矩阵 =", this.adjMat)
  }
}

module.exports = GraphAdjMatrix

// TEST:
const graph = new GraphAdjMatrix(
  [1, 3, 2, 5, 4],
  [
    [0, 3],
    [0, 1],
    [2, 3],
    [2, 1],
    [4, 3],
    [4, 2],
  ]
)
graph.print()
