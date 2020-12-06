const fs = require('fs').promises;

const day6Part2 = async function (filePath) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  let strings = data.split("\n");
  let total = 0;

  let groupAnswers = [];
  for (let str of strings) {
    if (str.length === 0) {
      let groupCache = {};
      for (let answer of groupAnswers) {
        for (let ch of answer) {
          groupCache[ch] = groupCache[ch] != null ? groupCache[ch] + 1 : 1;
        }
      }
      let pplInGroup = groupAnswers.length;
      for (let key of Object.keys(groupCache)) {
        if (groupCache[key] === pplInGroup) {
          total++;
        }
      }
      groupAnswers = [];
    } else {
      groupAnswers.push(str);
    }
  }
  return total;
}

console.log(day6Part2(process.argv[2]));
