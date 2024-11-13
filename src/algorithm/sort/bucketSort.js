/**
 * NOTE: 桶排序（将数据分成 k 个桶装入，再对每一个桶内元素进行排序），适用于数据量巨大，系统无法一次性处理完所有数据时，可将他们先划分到对应的桶中，再对每一个桶内数据做处理。
 * @param {Number[]} nums 待排序数组：数据范围为 [0, 1)
 */
function bucketSort(nums) {
  // 预计划分 k 个桶， 每个桶内放置两个元素（理想情况下平均分配）
  const len = nums.length
  const k = len / 2

  // 1. 桶的初始化（时间 O(n)）
  // const buckets = Array(k)
  //   .fill()
  //   .map(() => [])
  const buckets = []
  for (let i = 0; i < k; ++i) {
    buckets.push([])
  }

  // 2. 将数据装入对应桶中（时间 O(n)）
  for (let i = 0; i < len; ++i) {
    // NOTE: 基于输入数据范围 [0, 1)，使用 num * k 映射到索引范围 [0, k-1]
    let idx = Math.floor(nums[i] * k)
    buckets[idx].push(nums[i])
  }

  // 3. 对每个桶内元素进行排序
  for (let bucket of buckets) {
    bucket.sort((a, b) => a - b) // JS 内置排序，可换成其他的排序算法
  }

  // 4. 合并所有桶
  let i = 0
  for (let bucket of buckets) {
    for (let num of bucket) {
      nums[i++] = num
    }
  }
}

/**
 * 复杂度分析：
 * 1. 时间复杂度：O(n+k)<平均分布且k趋近于n的情况下>
 * 假设元素在各个桶内平均分布，那么每个桶内的元素数量为 n / k。假设排序单个桶使用 n/k * log(n / k) 时间，则排序所有桶使用 nlog(n / k) 时间。当桶数量比较大时(k ≈ n)，时间复杂度则趋向于 O(n)。合并结果时需要遍历所有桶和元素，花费 O(n + k) 时间。
 * 最差为 O(n^2)，所有数据被分到一个桶里。
 * 2. 空间复杂度：O(n + k)。需要借助 k 个桶和总共 n 个元素的额外空间。
 *
 * 稳定性：取决于桶内部排序算法的稳定性。
 */

const nums = [0.49, 0.96, 0.82, 0.09, 0.57, 0.43, 0.91, 0.75, 0.15, 0.37]
bucketSort(nums)
console.log("==> 桶排序后的数组 nums ： \n", nums)
