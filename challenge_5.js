//912. Sort an Array
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    function perculate(i, nums) {
  while (2 * i < nums.length) {
    if (
      2 * i + 1 < nums.length &&
      nums[2 * i + 1] < nums[2 * i] &&
      nums[i] > nums[2 * i + 1]
    ) {
      [nums[2 * i + 1], nums[i]] = [nums[i], nums[2 * i + 1]];
      i = 2 * i + 1;
    } else if (nums[i] > nums[2 * i]) {
      [nums[2 * i], nums[i]] = [nums[i], nums[2 * i]];
      i = 2 * i;
    } else {
      break;
    }
  }
}
function dequeue(nums) {
  let res = nums[1];
  nums[1] = nums.pop();
  perculate(1, nums);
  return res;
}
function heapify(nums) {
  nums.unshift(0);
  let curr = Math.floor(nums.length / 2);
  while (curr >= 1) {
    perculate(curr, nums);
    curr--;
  }
  return nums;
}

let lenght = nums.length;
let Heap = heapify(nums);
let sorted = [];
for (let i = 0; i <lenght ; i++) {
  let e = dequeue(Heap);
  sorted.push(e);
}
return sorted;
};
