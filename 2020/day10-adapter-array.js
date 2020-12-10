const fs = require('fs').promises;

let numPaths = 0;

// TODO: memoize
const findPaths = (numSet, currPath, num, maxNum) => {
  if (num === maxNum) {
    numPaths++;
    return;
  }
  // Find a number to go to:
  for (let i = 1; i <= 3; i++) {
    if (numSet.has(num + i)) {
      currPath.push(num + i);
      findPaths(numSet, currPath, num + i, maxNum);
      currPath.pop();
    }
  }
};

const day10 = async function (filePath) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  let strings = data.split("\n").filter(str => str.length > 0);
  let joltages = strings.map(numStr => Number(numStr));
  joltages.push(0);
  let sorted = joltages.sort((a, b) => a - b);
  let maxNum = sorted[sorted.length - 1] + 3;
  sorted.push(maxNum);

  let diffs = new Array(sorted.length).fill(0);
  diffs[0] = sorted[0];
  for (let i = 1; i < diffs.length; i++) {
    diffs[i] = sorted[i] - sorted[i - 1];
  }
  let ones = diffs.filter(diff => diff === 1).length;
  let threes = diffs.filter(diff => diff === 3).length;

  // Finding all paths to go from 0 to highest joltage:
  // Make a set of the numbers
  // From 0: recurse through the set until we get to highest joltage
  // Go thru other paths then unravel
  let set = new Set(sorted);
  findPaths(set, [], 0, maxNum);

  return [ones * threes, numPaths];
}

day10(process.argv[2]).then(val => console.log(val));
