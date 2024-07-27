// 2191. Sort the Jumbled Numbers
/**
 * @param {number[]} mapping
 * @param {number[]} nums
 * @return {number[]}
 */
var sortJumbled = function (mapping, nums) {
  let b = nums.reduce((a, c) => {
    let n = String(c)
      .split("")
      .map((e) => `${mapping[e]}`);
    let m = Number(n.join(""));
    a.push([c, m]);
    return a;
  }, []);
  return b.sort((a, b) => a[1] - b[1]).map((e) => e[0]);
};
