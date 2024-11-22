// function handleRequest(url, param) {
//     console.log("".concat(url, ", param: ").concat(param));
// }
// ;
// var req = { url: "https://example.com", param: 1 };
// handleRequest(req.url, req.param);
// // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.


function* generateSequence() {
  console.log('1')
  yield 1;
  console.log('2')
  yield 2;
  console.log('3')
  yield 3;
  // return 4
}

// "generator function" 创建了一个 "generator object"
let generator = generateSequence();
console.log(generator); // [object Generator]
const one = generator.next()
/** 输出 1 后，再执行下面的 one 输出 */
console.log("🚀 ~ one:", one) // { done: false, value: 1 }
const two = generator.next()
/** 输出 2 后，再执行下面的 two 输出 */
console.log("🚀 ~ two:", two)  // { done: false, value: 2 }
const three = generator.next()
/** 输出 3 后，再执行下面的 three 输出 */
console.log("🚀 ~ three:", three) // { done: true, value: 3 }
const four = generator.next()
console.log("🚀 ~ four:", four)
