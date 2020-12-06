const fs = require('fs').promises;

const day2Solution = async function (filePath) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });

  let strings = data.split("\n").filter(str => str.length > 0);
  let passwordAndConfigs = strings.map(str => {
    let parts = str.split(" ");
    let nums = parts[0], letterPart = parts[1], password = parts[2];
    let numParts = nums.split("-");

    return {
      left: Number(numParts[0]) - 1,
      right: Number(numParts[1]) - 1,
      letter: letterPart[0],
      password,
    }
  });
  let good = passwordAndConfigs.filter(obj => {
    const { left, right, letter, password } = obj;
    let atLeft = letter === password[left];
    let atRight = letter === password[right];
    return atLeft ^ atRight;
  })
  return good.length;
}

console.log(day2Solution(process.argv[2]));
