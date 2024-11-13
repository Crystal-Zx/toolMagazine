/**
 * NOTE: 基数排序：核心思想同计数排序。在计数排序的基础上，基数排序利用数字各位之间的递进关系，依次对每一位进行排序，从而得到最终的排序结果。
 * 适用场景：相较于计数排序，基数排序适用于数值范围较大的情况，但前提是数据必须可以表示为固定位数的格式，且位数不能过大。例如，浮点数不适合使用基数排序，因为其位数 k 过大，可能导致时间复杂度 O(nk) >> O(n^2)。
 * —— https://www.hello-algo.com/chapter_sorting/radix_sort/
 * @param {Number[]} nums
 */
function radixSort(nums) {
  // 1. 找出 nums 中的最大元素，作为从低向高遍历的上限值
  let max = Number.MIN_SAFE_INTEGER
  for (let num of nums) {
    max = Math.max(max, num)
  }
  // 2. 由低位向高位遍历完成计数排序
  // 最低位 k = 1，其 exp = 1；次低位 k = 2，其 exp = 10
  // exp = 10 ^ (k - 1)
  for (let exp = 1; exp < max; exp *= 10) {
    nums = countingSort(nums, exp) // 直接覆盖上一轮的排序结果
  }
  return nums
}

// TEST:
const nums = [356635100, 88906420, 10546151, 72429244, 34862445, 63832996]
console.log("==> 基数排序最终结果：", radixSort(nums))
console.log("==> 原数组：", nums)

// NOTE: 经过改造的计数排序（可根据 num 中第 k 位数值大小进行排序）
function countingSort(nums, exp) {
  const len = nums.length
  let max = getRadix(nums[0], exp)

  // 1. 找到数组中的最大值
  for (let i = 1; i < len; ++i) {
    max = Math.max(max, getRadix(nums[i], exp))
  }

  // 2. 创建 counter 辅助数组 && 遍历计数
  let counter = new Array(max + 1).fill(0)
  for (let i = 0; i < len; ++i) {
    const num = getRadix(nums[i], exp)
    counter[num] += 1
  }

  // 3. 计算 counter 数组的前缀和， counter 的下标为 nums 中的元素 num
  const prefix = [counter[0]]
  for (let i = 1; i < max + 1; ++i) {
    prefix[i] = prefix[i - 1] + counter[i]
  }

  // 4. prefix[num] - 1 是 num 在结果数组中最后出现位置的下标
  let res = []
  for (let i = len - 1; i >= 0; --i) {
    const num = getRadix(nums[i], exp)
    res[prefix[num] - 1] = nums[i]
    prefix[num]--
  }
  // console.log("==> 当前轮排序结果", res)
  return res
}

// 求某大数的第 k 位值：num(k) = Math.floor(num / exp) % d（d 为 num 的进制，此处为 10）
// exp = d ^ (k - 1)
function getRadix(num, exp) {
  return Math.floor(num / exp) % 10
}

/**
 * 复杂度分析：
 * 1. 时间复杂度：O(nk)。设数据量为 n 、数据为 d 进制、最大位数为 k ，则对某一位执行计数排序使用 O(n + d) 时间，排序所有 
 位使用 O((n + d) * k) 时间。通常情况下，d 和 k 都相对较小，时间复杂度趋向 O(n)。
 * 2. 空间复杂度：O(n + d)。非原地排序。
 *
 * 稳定性：基于计数排序，是稳定排序。
 */
