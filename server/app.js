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
      packages.push({ name: line.slice(9) });
    } else if (line.startsWith('Description:')) {
      packages[packages.length - 1].desc = line.slice(13);
    } else if (line.startsWith(' ')) {
      packages[packages.length - 1].desc += line;
    }
  });

app.get('/api/packages', (req, res) => {
  res.send(
    packages.sort((pkg1, pkg2) => {
      if (pkg1.name < pkg2.name) {
        return -1;
      }
      if (pkg1.name > pkg2.name) {
        return 1;
      }
      return 0;
    })
  );
});

app.listen(3001);
