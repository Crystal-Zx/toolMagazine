const React = {
  createTextElement: function (text) {
    // 统一结构，方便后序遍历
    return {
      type: 'TEXT_ELEMENT',
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
    return {
      type,
      props: {
        ...props,
        children: children.map(child => typeof child === 'object' ? child : this.createTextElement(child))
      }
    }
  },
  /**
   * 将虚拟 DOM 渲染成真实 DOM
   * @param {VDOM} element 虚拟DOM节点
   * @param {*} container 要挂载的父DOM节点（真实DOM，而非虚拟DOM）
   */
  render: function (element, container) {
    // NOTE: create dom nodes
    const dom = document.createElement(element.type)
    element.children.forEach(child => {
      render(child, dom)
    })
    container.appendChild(dom)
  },

}

/** ---------------------------------------------------------------------------------- */
let nextUnitOfWork = null  // 下一个工作单元
/**
 * 任务切片：实现在浏览器每一帧的空闲时间完成任务执行
 * @param {IdleDeadline} idleDeadline 原生接口类型，提供了：
 *  - timeRemaining() 方法，用来判断用户代理预计还剩余多少闲置时间；
 *  - didTimeout 属性，用来判断当前的回调函数是否因超时而被执行。
 */
function workLoop (idleDeadline) {
  let shouldYield = false;
  while (!shouldYield && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = idleDeadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

function performUnitOfWork () {}


/** TEST: */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )
/** NOTE: 「STEP ONE」通过 Babel 或 SWC 之类的编译插件，将 JSX 转换为 纯 JS 调用，生成 虚拟 DOM 树结构 */
const vdom = React.createElement(
  "div",
  { id: "foo" },
  React.createElement("a", null, "bar"),
  React.createElement("b")
)
console.log("🚀 ~ vdom:", vdom)

/** NOTE: 「STEP TWO」利用 Fiber 架构实现任务切片
 * 利用浏览器原生 API requestIdleCallback 来实现任务切片
 */
requestIdleCallback(workLoop)