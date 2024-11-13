const TextSymbol = Symbol('TEXT_ELEMENT')

const isPropKey = key => key !== 'children'

const React = {
  // NOTE: createTextElement 和 createElement 用于创建 vdom
  createTextElement: function (text) {
    // 统一结构，方便后序遍历
    return {
      type: TextSymbol,
      props: {
        nodeValue: text,
        children: []
      }
    }
  },
  /**
   * createElement 要做的事情：
   * 1. 用于生成虚拟 DOM 树，返回一个包含 type（元素类型）和 props（属性和子元素）的对象。 children 可以是文本或其他虚拟 DOM 对象。 React.createTextElement:
   * 2. 用于处理文本节点，将字符串封装成虚拟 DOM 对象。 React.render:
   * 3. 将虚拟 DOM 转化为实际 DOM 元素。 使用递归的方式渲染所有子元素。 最后将生成的 DOM 节点插入到指定的容器中
   * @param {String} type
   * @param {Object} props
   * @param {Array} children
   * @returns
   */
  createElement: function (type, props = {}, ...children) {
    /**
     * props 处有一个隐藏知识：为什么 createElement(type, null, createElement()) 在 ...props 不会报错？
     * 当你使用扩展运算符 (...) 来复制一个对象时，JavaScript 会迭代这个对象的可枚举属性，并将它们复制到一个新的对象中。
     * 然而，如果被扩展的值是 null 或 undefined，扩展运算符会简单地返回一个空对象 {}。
     * 「TIPS」在其他情况下 ...null 是会正常抛出错误的
     *  */
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === 'object' ? child : this.createTextElement(child)
        )
      }
    }
  },
  /**
   * render 版本一：将虚拟 DOM (vdom) 渲染成真实 DOM
   * （没有任务分片时，一进入 render 流程就不能停止）
   * @param {VDOM} element 虚拟DOM节点
   * @param {*} container 要挂载的父DOM节点（真实DOM，而非虚拟DOM）
   */
  render: function (element, container) {
    const dom =
      element.type === TextSymbol
        ? document.createTextNode('')
        : document.createElement(element.type)
    Object.keys(element.props)
      .filter(isPropKey)
      .forEach(propKey => {
        dom[propKey] = element.props[propKey]
      })
    // 递归子节点完成创建
    element.props.children.forEach(child => {
      this.render(child, dom)
    })
    container.appendChild(dom)
  }
}

/** TEST: */
// const element = (
//   <div id='foo'>
//     <a>bar</a>
//     <b />
//   </div>
// )
/** NOTE: 「STEP ONE」通过 Babel 或 SWC 之类的编译插件，将 JSX 转换为 纯 JS 调用，生成 虚拟 DOM 树结构 */
// const vdom = React.createElement(
//   'div',
//   { id: 'foo', style: 'background-color: pink' },
//   React.createElement('a', null, 'bar'),
//   React.createElement('b')
// )
// console.log('🚀 ~ vdom:', vdom)
// React.render(vdom, document.getElementById('root'))

/** ---------------------------------- Fiber 调和阶段 ------------------------------------------------ */
/** NOTE: 「STEP TWO」利用 Fiber 架构实现任务切片
 * 利用浏览器原生 API requestIdleCallback 来实现任务切片
 */
let nextUnitOfWork = null // 下一个工作单元
let wipRoot = null // 当前正在进行工作的 fiber 树
let currentRoot = null // 旧的 fiber 树
let deletions = null // 待删除的 fiber 节点

const EffectTag = {
  Update: Symbol('UPDATE'),
  Placement: Symbol('PLACEMENT'),
  Deletion: Symbol('DELETION')
}

function updateDom(dom, prevProps, nextProps) {
  // 1. 清空旧属性
  Object.keys(prevProps)
    .filter(isPropKey)
    .map(key => {
      dom[key] = ''
    })
  // 2. 添加新属性
  Object.keys(nextProps)
    .filter(isPropKey)
    .map(key => {
      dom[key] = nextProps[key]
    })
}
function createDom(fiber) {
  // 1. 创建真实 DOM 节点
  const dom =
    fiber.type === TextSymbol
      ? document.createTextNode('')
      : document.createElement(fiber.type)
  // 2. 挂载属性
  updateDom(dom, {}, fiber.props)

  return dom
}
/**
 *
 * @param {VDOM NODE} element 虚拟 DOM 节点
 * @param {Fiber NODE} parent 父 fiber 节点
 * @returns
 */
function createFiber(element, parent) {
  return {
    type: element.type,
    props: element.props,
    parent,
    dom: null,
    child: null,
    sibling: null,
    alternate: null,
    effectTag: null
  }
}
/**
 * render 版本二：利用 requestIdleCallback 和 fiber 进行任务分片，可停止的 render 过程
 * @param {*} element
 * @param {*} container
 */
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot // 旧的 fiber 树，便于后续 diff 算法进行新旧比较遍历
  }
  deletions = []
  nextUnitOfWork = wipRoot // 将当前 fiber 树赋值给下一个工作单元待执行
}
/**
 * 任务切片：实现在浏览器每一帧的空闲时间完成任务执行
 * @param {IdleDeadline} deadline 原生接口类型，提供了：
 *  - timeRemaining() 方法，用来判断用户代理预计还剩余多少闲置时间；
 *  - didTimeout 属性，用来判断当前的回调函数是否因超时而被执行。
 */
function workLoop(deadline) {
  let shouldYield = false
  while (!shouldYield && nextUnitOfWork) {
    console.log('🚀 ~ 开启一次 workLoop:')

    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  // nextUnitOfWork 在遍历完当前 fiber 树后会返回 null，此时代表已经完成了当前 fiber 树的工作（Fiber 调和），可以进行提交渲染真实DOM了
  // wipRoot 代表待提交的工作根
  if (!nextUnitOfWork && wipRoot) {
    console.log('🚀 ~ 开启一次 commitRoot 提交:')
    commitRoot()
  }
  requestIdleCallback(workLoop)
}
// requestIdleCallback 浏览器绘制一帧16ms 空闲的时间去执行的函数 浏览器自动执行
// 浏览器一帧做些什么
// 1.处理时间的回调click...事件
// 2.处理计时器的回调
// 3.开始帧
// 4.执行requestAnimationFrame 动画的回调
// 5.计算机页面布局计算 合并到主线程
// 6.绘制
// 7.如果此时还有空闲时间，执行requestIdleCallback
requestIdleCallback(workLoop)

/**
 * 1. add dom node
 * 2. create new fibers
 * 3. return next unit of work
 * @param {Fiber Node} fiber 接收一个 Fiber 工作单元
 * @returns {Fiber Node | null} 返回下一个工作单元
 */
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  // 遍历字节点：调和子节点 fibers
  const elements = fiber.props.children
  reconcileChildren(fiber, elements)

  // 处理返回值：返回下一个工作单元
  if (fiber.child) return fiber.child // {1⭐} 这里的 .child 是代表 fiber 节点之间关系的指针，有：.parent/.sibling/.child

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    // 找不到兄弟节点就向上查找，找父级的兄弟节点
    nextFiber = nextFiber.parent
  }
  return null
}
/**
 * 1. 形成 fiber 树
 * 2. Diff 算法
 * @param {*} fiber
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let prevSibling = null
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  while (index < elements.length || oldFiber != null) {
    const element = elements[index]
    // Diff 算法：这里只浅显的比较了两者的 type 是否一致，React 实际源码中比这个复杂很多
    const sameType = element && oldFiber && element.type === oldFiber.type
    let newFiber = null
    // -- Diff 1. 复用
    if (sameType) {
      console.log('🚀 ~ reconcileChildren ~ 复用:', oldFiber.type)
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: EffectTag.Update
        // child: ...,
        // sibling: ...
      }
    }
    // -- Diff 2. 新增
    if (element && !sameType) {
      console.log('🚀 ~ reconcileChildren ~ 新增:', element.type)
      newFiber = createFiber(element, wipFiber)
      newFiber.effectTag = EffectTag.Placement
    }
    // -- Diff 3. 删除
    if (oldFiber && !sameType) {
      console.log('🚀 ~ reconcileChildren ~ 删除:', oldFiber.type)
      oldFiber.effectTag = EffectTag.Deletion
      deletions.push(oldFiber)
    }
    // 移动 oldFiber 指针，指向下一个待比较的节点
    if (oldFiber) oldFiber = oldFiber.sibling

    // 创建 Fiber 树结构
    // 将子节点与当前 fiber 父节点串联成符合要求的树结构（对应上文中 {1⭐} 处）
    if (!index) {
      wipFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}

/** ------------------------------------ 提交渲染 ---------------------------------------------- */
function commitRoot() {
  // commitWork(deletions[0])
  deletions.forEach(commitWork) // 清除标记为 EffectTag.DELETION 的 fiber 节点
  commitWork(wipRoot.child) // 提交当前的工作根，进行其子节点的 Fiber 提交（！！注意这里是 wipRoot.child 而非 wipRoot 本身，它指代的真实 DOM 是 render 挂载的 container 元素）
  currentRoot = wipRoot // 将当前工作根保存为旧的工作根（双渲染机制，能够更好的进行复用）
  wipRoot = null // 清空当前工作根
}

function commitWork(fiber) {
  if (!fiber) return
  const parentDom = fiber.parent.dom

  // 处理当前 fiber 节点
  switch (fiber.effectTag) {
    case EffectTag.Placement:
      fiber.dom && parentDom.appendChild(fiber.dom)
      break
    case EffectTag.Update:
      fiber.dom && updateDom(fiber.dom, fiber.alternate.props, fiber.props)
      break
    case EffectTag.Deletion:
      console.log('🚀 ~ commitWork ~ Deletion:', parentDom, fiber)
      parentDom.removeChild(fiber.dom)
      return
    // break
    default:
      break
  }

  // 递归处理子节点以及兄弟节点：从这里的递归调用可以看出来， commit Phase 提交阶段一旦开始也是不能中断的
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

// TEST:
// const vdom11 = React.createElement(
//   'div',
//   { id: 1 },
//   React.createElement('span', null, 'hello 111')
// )
// const vdom12 = React.createElement(
//   'div',
//   { id: 1 },
//   React.createElement('p', { style: 'color: red' }, 'hello 222')
// )

// render(vdom11, document.getElementById('root'))
// setTimeout(() => {
//   render(vdom12, document.getElementById('root'))
// }, 3000)

const vdom21 = React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'A'),
  React.createElement('h2', null, 'B'),
  React.createElement('h3', null, 'C'),
  React.createElement('h4', null, 'D')
)
const vdom22 = React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'A'),
  React.createElement('h3', null, 'C'),
  React.createElement('h2', null, 'B'),
  React.createElement('h5', null, 'E')
)
render(vdom21, document.getElementById('root'))
setTimeout(() => {
  render(vdom22, document.getElementById('root'))
}, 3000)
