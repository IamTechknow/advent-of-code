const fs = require('fs').promises;

const getNum = (str, isRow) => {
  let leftVal = isRow ? 'F' : 'L';
  let rightVal = isRow ? 'B' : 'R';
  let lo = 0, hi = 2 ** str.length - 1;
  let currVal = 2 ** str.length;

  for (let i = 0; i < str.length; i++) {
    let isLeft = str[i] === leftVal;
    currVal = currVal >> 1;
    if (isLeft) {
      hi -= currVal;
    } else {
      lo += currVal;
    }
  }

  return str[str.length - 1] === leftVal ? lo : hi;
};

const day5Part2 = async function (filePath) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  let strings = data.split("\n").filter(str => str.length > 0);
  // let highest = 0;
  let ids = [];
  for (let str of strings) {
    let rowStr = str.substring(0, 7);
    let colStr = str.substring(7, 10);

    let rowNum = getNum(rowStr, true);
    let colNum = getNum(colStr, false);

    let idForRow = rowNum * 8 + colNum;
    ids.push(idForRow);

    // Part 1 solution
    // highest = Math.max(highest, rowNum * 8 + colNum);
  }
  ids.sort((a, b) => a - b);

  // print missing
  let start = ids[0];
  for (let i = 0; i < ids.length; i++) {
    if (start !== ids[i]) {
      console.log(start);
      start++;
    }
    start++;
  }

  // Part 1 solution
  // return highest;
}

console.log(day5Part2(process.argv[2]));
