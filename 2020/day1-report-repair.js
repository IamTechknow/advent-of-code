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
  throw new Error("Solution wasn't found");
};

const threeSum = (nums, target = 0) => {
  const results = [];
  if (nums.length < 3) {
    return results;
  }

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let sum = target - nums[i];
    let lo = i + 1, hi = nums.length - 1;
    while (lo < hi) {
      if (nums[lo] + nums[hi] === sum) {
        results.push([nums[i], nums[lo], nums[hi]]);
        while (lo < hi && nums[lo] === nums[lo + 1]) {
          lo++;
        }
        while (lo < hi && nums[hi] === nums[hi - 1]) {
          hi--;
        }
        lo++;
        hi--;
      } else if (nums[lo] + nums[hi] < sum) {
        lo++;
      } else {
        hi--;
      }
    }
  }

  return results;
};

const day1Solution = async function (filePath) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  const strings = data.split("\n").filter(str => str.length > 0);
  const nums = strings.map(numStr => Number(numStr));

  const twoSumSolution = twoSum(nums, 2020);
  const threeSumSolution = threeSum(nums, 2020);

  console.log(twoSumSolution.reduce((accum, curr) => accum * curr));
  console.log(threeSumSolution.reduce((accum, curr) => accum * curr));
}

day1Solution(process.argv[2]);
