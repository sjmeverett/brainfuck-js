const fs = require('fs');

const filename = process.argv[2];
const file = fs.readFileSync(filename).toString('utf8');
const instructions = [...file];

const map = {
  '>': 'ptr++;',
  '<': 'ptr--;',
  '+': 'data[ptr] = (data[ptr] || 0) + 1;',
  '-': 'data[ptr] = (data[ptr] || 0) - 1;',
  '.': 'process.stdout.write(String.fromCharCode(data[ptr]));',
  ',': `console.log('input disabled');`,
  '[': 'while (data[ptr] !== 0) { ',
  ']': '}'
};

const js =
  'const data = []; let ptr = 0;' +
  instructions
    .map((instr) => map[instr] || '')
    .join('');

console.log(js);
eval(js);
