const express = require('express');
const cors = require('cors');
const { processPackages, sort } = require('./utils/packageHelper');

const app = express();
app.use(cors());

app.get('/api/packages', async (req, res) => {
  const packages = await processPackages();
  sort(packages);
  res.send(packages);
});

app.listen(3001);
