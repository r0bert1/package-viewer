const express = require('express');
const cors = require('cors');
const { processPackages } = require('./utils/packageHelper');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static('client/build'));

app.get('/health', (req, res) => {
  res.send('ok');
});

app.get('/api/packages', async (req, res) => {
  const packages = await processPackages();
  res.send(packages);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
