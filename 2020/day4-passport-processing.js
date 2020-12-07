const fs = require('fs').promises;

const validate = (passport) => {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;

  const byrNumber = Number(byr);
  if (isNaN(byrNumber) || byrNumber < 1920 || byrNumber > 2002) {
    return false;
  }
  const iyrNumber = Number(iyr);
  if (isNaN(iyrNumber) || iyrNumber < 2010 || iyrNumber > 2020) {
    return false;
  }
  const eyrNumber = Number(eyr);
  if (isNaN(eyrNumber) || eyrNumber < 2020 || eyrNumber > 2030) {
    return false;
  }
  let cmPart = hgt.split('cm'), inPart = hgt.split('in');
  let isCm = cmPart.length === 2;
  let isIn = inPart.length === 2;
  let heightStr = isCm ? cmPart[0] : (isIn ? inPart[0] : null);
  if (heightStr == null) {
    return false;
  }
  const heightNum = Number(heightStr);
  if (isNaN(heightNum)) {
    return false;
  }
  if (isCm && (heightNum < 150 || heightNum > 193)) {
    return false;
  } else if (isIn && (heightNum < 59 || heightNum > 76)) {
    return false;
  }

  if (hcl[0] !== '#' || hcl.length !== 7) {
    return false;
  }

  switch (ecl) {
    case 'amb':
    case 'blu':
    case 'brn':
    case 'gry':
    case 'grn':
    case 'hzl':
    case 'oth':
      break;
    default:
      return false;
  }

  if (pid.length !== 9 || isNaN(pid)) {
    return false;
  }

  return true;
};

const day4Solution = async function (filePath) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });

  let strings = data.split("\n");

  let numValid = 0;
  let currPassport = {};
  for (let str of strings) {
    // Validate passport, reset curr passport data
    if (str.length === 0) {
      const cidFound = currPassport['cid'] != null;
      const numExpected = cidFound ? 8 : 7;
      if (Object.keys(currPassport).length === numExpected && validate(currPassport)) {
        numValid++;
      }
      currPassport = {};
    } else {
      let parts = str.split(' ');
      for (let part of parts) {
        let pair = part.split(':');
        currPassport[pair[0]] = pair[1];
      }
    }
  }
  return numValid;
}

day4Solution(process.argv[2]).then(res => console.log(res));
