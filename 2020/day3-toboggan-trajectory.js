const fs = require('fs').promises;

const checkSlopes = async function (filePath, c_slope, r_slope) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });

  let strings = data.split("\n").filter(str => str.length > 0);
  const w = strings[0].length, h = strings.length;
  const grid = new Array(h);
  for (let i = 0; i < h; i++) {
    grid[i] = new Array(w);
  }

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      grid[r][c] = strings[r][c] === '#';
    }
  }

  let trees = 0;
  let r = 0, c = 0;
  while (r < h) {
    // take modulo
    let c_modulo = c % w;
    // check grid
    if (grid[r][c_modulo]) {
      trees++;
    }
    // increment
    r += r_slope;
    c += c_slope;
  }
  return trees;
}

const results = [];
const filePath = process.argv[2];
results.push(checkSlopes(filePath, 1, 1));
results.push(checkSlopes(filePath, 3, 1));
results.push(checkSlopes(filePath, 5, 1));
results.push(checkSlopes(filePath, 7, 1));
results.push(checkSlopes(filePath, 1, 2));

console.log(results.reduce((accum, curr) => accum * curr));
