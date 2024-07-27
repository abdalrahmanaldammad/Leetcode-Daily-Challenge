//451. Sort Characters By Frequency
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  let b = {};
  let k = {};
  for (let c of s) {
    b[c] = b[c] + 1 || 1;
  }
  for (let key in b) {
    if (k[b[key]]) {
      k[b[key]] = k[b[key]] + key.repeat(b[key]);
    } else {
      k[b[key]] = key.repeat(b[key]);
    }
  }
  let res = "";
  for (let i = s.length; i >= 0; i--) {
    if (k[i]) {
      res += k[i];
    }
  }
  return res;
};
