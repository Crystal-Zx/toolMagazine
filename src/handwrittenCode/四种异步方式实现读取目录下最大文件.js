/**
 * NodeJS 方法说明
 * fs.readdir： 方法用于读取目录，返回一个包含文件和目录的数组。
 * fs.stat： 方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。此外，该对象还有一个 isFile() 方法可以判断正在处理的到底是一个文件，还是一个目录。
 */
const fs = require("fs")
const path = require("path")
const co = require("co") // 这里的 co 模块是 npm 下载的。另外一个文件里有其实现源码。 官网： https://github.com/tj/co

/** NOTE: 1. callback 形式 */
// -- 方法定义
function findLargest(dir, cb) {
  fs.readdir(dir, function (err, files) {
    if (err) return cb(err)
    let errored = false
    let stats = []
    let counter = files.length

    files.forEach(function (file, index) {
      fs.stat(path.join(dir, file), function (err, stat) {
        if (errored) return
        if (err) {
          errored = true
          return cb(err)
        }
        if (!stat.isFile()) return
        stats[index] = stat

        if (--counter == 0) {
          const largest = stats
            .filter(stat => stat.isFile())
            .reduce((prev, next) => {
              if (prev.size > next.size) return prev
              return next
            })
          cb(null, files[stats.indexOf(largest)])
        }
      })
    })
  })
}
// -- 方法使用
// findLargest("./工具函数", function (err, fileName) {
//   if (err) {
//     return console.log("sth wrong")
//   }
//   console.log("==> stat of largest file", fileName)
// })

/** NOTE: 2. Promise 形式 */
// -- 方法定义
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, function (err, stat) {
      if (err) return reject(err)
      return resolve(stat)
    })
  })
}
function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, function (err, files) {
      if (err) return reject(err)
      resolve(files)
    })
  })
}
function findLargestPromise(dir) {
  return readDir(dir)
    .then(files => {
      const statPromises = files.map(file => readFile(path.join(dir, file)))
      return Promise.all(statPromises).then(stats => ({
        stats,
        files,
      }))
    })
    .then(({ stats, files }) => {
      const largest = stats
        .filter(stat => stat.isFile())
        .reduce((prev, next) => {
          if (prev.size > next.size) return prev
          return next
        })
      return files[stats.indexOf(largest)]
    })
}
// -- 方法使用
// findLargestPromise("./工具函数")
//   .then(fileName => console.log("==> 最大文件为", fileName))
//   .catch(err => console.log(err || "sth wrong"))

/** NOTE: 3. Generator 形式 */
// -- 方法定义
function* findLargestGen(dir) {
  const files = yield readDir(dir)
  const stats = yield files.map(file => readFile(path.join(dir, file)))
  const largest = stats
    .filter(stat => stat.isFile())
    .reduce((prev, next) => {
      if (prev.size > next.size) return prev
      return next
    })
  return files[stats.indexOf(largest)]
}
// -- 方法使用
// co(findLargestGen, "./工具函数")
//   .then(fileName => console.log("==> 最大文件为", fileName))
//   .catch(err => console.log(err || "sth wrong"))

/** NOTE: 4. Async */
// -- 方法定义
async function findLargestAsync(dir) {
  const files = await readDir(dir)
  const stats = await Promise.all(
    files.map(file => readFile(path.join(dir, file)))
  )
  const largest = stats
    .filter(stat => stat.isFile())
    .reduce((prev, next) => {
      if (prev.size > next.size) return prev
      return next
    })
  return files[stats.indexOf(largest)]
}
// -- 方法使用
findLargestAsync("./工具函数")
  .then(fileName => console.log("==> 最大文件为", fileName))
  .catch(err => console.log(err || "sth wrong"))
