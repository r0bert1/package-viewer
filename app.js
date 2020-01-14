const fs = require('fs');
const readline = require('readline');
const http = require('http');

const packages = [];

readline
  .createInterface({
    input: fs.createReadStream('status.real'),
    terminal: false
  })
  .on('line', line => {
    if (line.startsWith('Package:')) {
      packages.push(line.slice(9));
    }
  });

const server = http.createServer((request, response) => {
  if (request.url === '/') {
    const sortedPackages = packages.sort();
    response.write(JSON.stringify(sortedPackages));
    response.end();
  }
});

server.listen(3000);
