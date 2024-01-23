const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const outputStream = fs.createWriteStream(filePath);
console.log('Welcom! Type some information or tab "exit" to finish.');

input.on('line', (data) => {
  if (data.trim().toLowerCase() === 'exit') {
    console.log('Goodbye!');
    input.close();
  } else {
    outputStream.write(data + '\n');
  }
});

input.on('close', () => {
  console.log('Process terminated.');
  outputStream.end();
});
