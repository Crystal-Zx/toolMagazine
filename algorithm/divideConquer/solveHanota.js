function solveHanota(A, B, C) {
  const size = A.length
  dfs(size, A, B, C)
}

function solveHanotaPrintRoute(size) {
  dfs(size, "A", "B", "C")
}

function dfs(size, src, buff, tar) {
  if (size === 1) {
    move(src, tar)
    return
  }
  dfs(size - 1, src, tar, buff)
  move(src, tar)
  dfs(size - 1, buff, src, tar)
}

function move(src, tar) {
  // tar.push(src.pop())
  console.log(`Move ${src} to ${tar}`)
}

// TEST:
let A = [4, 3, 2, 1],
  B = [],
  C = []
// solveHanota(A, B, C)
// console.log(A, B, C)

solveHanotaPrintRoute(3)
