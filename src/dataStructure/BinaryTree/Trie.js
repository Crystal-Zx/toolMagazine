function Node() {
  this.children = new Array(26).fill(null)
  this.end = false
}

// NOTE: 单词前缀树
class Trie {
  root
  constructor() {
    this.root = new Node()
  }
  /**
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let curr = this.root
    for (let c of word) {
      const idx = c.charCodeAt(0) - 'a'.charCodeAt(0)
      if (!curr.children[idx]) {
        curr.children[idx] = new Node()
      }
      curr = curr.children[idx]
    }
  }
  #find(word) {
    let curr = this.root
    for (let c of word) {
      const idx = c.charCodeAt(0) - 'a'.charCodeAt(0)
      if (!curr.children[idx]) return 0
      curr = curr.children[idx]
    }
    return curr.end ? 1 : 2
  }
  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    return this.#find(word) === 1
  }
  /**
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    return this.#find(prefix) !== 0
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
