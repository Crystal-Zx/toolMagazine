let start = new Date().getTime()
console.log("start", start);
setTimeout(() => {
  console.log("timeout", new Date().getTime() - start);
}, 2)
setImmediate(() => {
  console.log("immediate");
})
let end = new Date().getTime()
console.log("end", end, end - start);