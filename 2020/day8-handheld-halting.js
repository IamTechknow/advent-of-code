const fs = require('fs').promises;

const runProgram = (instructions) => {
  let accum = 0;
  let visited = new Array(instructions.length).fill(false);
  let index = 0;
  while (index < instructions.length && !visited[index]) {
    visited[index] = true;
    const { op, pos, val } = instructions[index];
    const value = val * (pos ? 1 : -1);

    switch (op) {
      case 'acc':
        accum += value;
        index++;
        break;
      case 'jmp':
        index += value;
        break;
      default:
        index++;
        break;
    }
  }
  let didTerminate = index >= instructions.length;
  return [accum, didTerminate];
}

const day8 = async function (filePath) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  let strings = data.split("\n").filter(str => str.length > 0);
  let instructions = strings.map(str => {
    const [op, num] = str.split(" ");
    const pos = num[0] === '+';
    return {
      op,
      pos,
      val: Number(num.substring(1)),
    };
  });
  let part1 = runProgram(instructions)[0];

  let part2;
  for (let i = 0; i < instructions.length; i++) {
    let copy = instructions.slice();
    let { op, pos, val } = instructions[i];
    if (op === 'acc') {
      continue;
    }

    let newInstruction = {
      op: op === 'jmp' ? 'nop' : 'jmp',
      pos,
      val,
    };

    copy[i] = newInstruction;
    let [accum, didTerminate] = runProgram(copy);
    if (didTerminate) {
      part2 = accum;
      break;
    }
  }

  return [part1, part2];
}

day8(process.argv[2]).then(val => console.log(val));
