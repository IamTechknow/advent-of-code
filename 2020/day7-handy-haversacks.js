const fs = require('fs').promises;

const hasInputColor = (rules, color, inputColor) => {
  let colors = rules[color].map(colorObj => colorObj['color']);
  if (colors.length === 0) {
    return false;
  }
  if (colors.includes(inputColor)) {
    return true;
  }
  for (let color of colors) {
    if (hasInputColor(rules, color, inputColor)) {
      return true;
    }
  }
  return false;
}

const countBagsForColor = (rules, inputColor, amt = 1) => {
  let colors = rules[inputColor];
  if (colors.length === 0) {
    return 0;
  }
  let depthTotal = 0;
  for (let colorObj of colors) {
    const { num, color } = colorObj;
    const bagsInBag = countBagsForColor(rules, color, num);
    depthTotal += (num + (bagsInBag));
  }
  return amt * depthTotal;
}

const day7 = async function (filePath, inputColor) {
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  let strings = data.split("\n").filter(str => str.length > 0);

  const rules = {};
  for (let str of strings) {
    const colors = [];
    let [parentColorPart, childColorsPart] = str.split(" contain ");

    let parentColor = parentColorPart.split(" bags")[0];
    if (childColorsPart !== 'no other bags.') {
      let childColors = childColorsPart.split(", ");

      for (let childColor of childColors) {
        let [numStr, adjective, color, _bags] = childColor.split(" ");
        colors.push({
          color: `${adjective} ${color}`,
          num: Number(numStr),
        });
      }
    }
    rules[parentColor] = colors;
  }

  const keys = Object.keys(rules);
  let totalBagColors = 0;

  for (let color of keys) {
    if (hasInputColor(rules, color, inputColor)) {
      totalBagColors++;
    }
  }

  // Part 2
  let numBagsinInputColorBag = countBagsForColor(rules, inputColor);
  return [totalBagColors, numBagsinInputColorBag];
}

day7(process.argv[2], "shiny gold").then(val => console.log(val));
