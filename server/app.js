const fs = require('fs');
const readline = require('readline');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const packages = [];

readline
  .createInterface({
    input: fs.createReadStream('server/assets/status.real'),
    terminal: false
  })
  .on('line', line => {
    if (line.startsWith('Package:')) {
      packages.push(line.slice(9));
    }
  });

app.get('/api/packages', (req, res) => {
  res.send(packages.sort());
});

app.listen(3001);
