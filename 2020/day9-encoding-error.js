const fs = require('fs').promises;

const twoSum = (nums, target = 0) => {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map[diff] != null) {
      return [map[diff], i];
    } else {
      map[nums[i]] = i;
    }
  }
  return [];
};

const day9 = async function (filePath, preamble = 25) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  let strings = data.split("\n").filter(str => str.length > 0);
  let nums = strings.map(numStr => Number(numStr));

  let idx = preamble;
  while (idx < nums.length) {
    let last25 = nums.slice(idx - preamble, idx);
    let twoSumSolution = twoSum(last25, nums[idx]);
    if (twoSumSolution.length === 0) {
      break;
    }
    idx++;
  }
  if (idx === nums.length) {
    throw new Error("Reached the end of the numbers without a solution part 1!");
  }
  part1Solution = nums[idx];
  let part1Idx = idx;
  let part2Arr = null;
  for (let i = 0; i < part1Idx && !part2Arr; i++) {
    for (let j = i + 1; j < part1Idx && !part2Arr; j++) {
      const arr = nums.slice(i, j + 1);
      const result = arr.reduce((accum, curr) => accum + curr);
      if (result === part1Solution) {
        part2Arr = arr;
      }
    }
  }
  if (part2Arr == null) {
    throw new Error("Reached the end of the numbers without a solution for part 2!");
  }

  let sorted = part2Arr.sort((a, b) => a - b);
  return [part1Solution, sorted[0] + sorted[sorted.length - 1]];
}

day9(process.argv[2]).then(val => console.log(val));
