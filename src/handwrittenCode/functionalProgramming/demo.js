import { curry } from './curry.js'
import { compose, composeLeft } from './compose.js'

/** NOTE: pointfree：指的是函数无须提及将要操作的数据是什么样的。 */
/**
 * NOTE: 函数式编程使用总结
 * - 柯里化: 用于想要「分批次传入函数参数」时使用，需要注意参数顺序，想要后传入的卸载参数列表的后面，针对的是单个函数调用时的传参优化；
 * - 组合：将多个函数按序调用（正序 Or 逆序）组合成功能更强大的复合函数时使用，针对的是函数调用链的优化；
 *  */

// 需求：输入 'kevin daisy kelly'，返回 'K.D.K'

/** --------- 原始写法（非 pointfree,无法拆解函数，功能耦合在一起） --------- */
// ，因为提到了数据：name
var initials = function (name) {
  return name.split(' ').map(compose(toUpperCase, head)).join('.')
}

/** ------------ 进阶写法（pointfree，拆分成各个具体的工具函数） ------------ */
const split = curry((separator, str) => str.split(separator))
const map = curry((fn, arr) => arr.map(fn))
const head = str => str[0]
const toUpperCase = str => str.toUpperCase()
const join = curry((separator, arr) => arr.join(separator))

const finalFunctional = compose(
  join('.'),
  map(compose(toUpperCase, head)),
  split(' ')
)

const finalFunctionalLeft = composeLeft(
  split(' '),
  map(compose(head, toUpperCase)),
  join('.')
)

// TEST:
const str = 'kevin daisy kelly'
console.log(`🚀 ~ initials: ${initials(str)}`)
console.log(`🚀 ~ finalFunctional: ${finalFunctional(str)}`)
console.log(`🚀 ~ finalFunctionalLeft: ${finalFunctionalLeft(str)}`)

// TEST:
/** 数学计算 */
const add = curry((x, y) => {
  console.log('🚀 ~ add:', x, y)
  return x + y
})
const square = x => Math.pow(x, 2)
const minusFive = x => x - 5
const calc = composeLeft(add(4), square, minusFive)
console.log(calc(2))
