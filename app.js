const fs = require('fs')
const readline = require('readline')

let packages = []

readline.createInterface({
  input: fs.createReadStream('status.real'),
  terminal: false
}).on('line', (line) => {
  if (line.startsWith('Package:')) {
    packages.push(line.slice(9))
  }
})