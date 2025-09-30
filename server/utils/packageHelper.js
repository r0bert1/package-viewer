const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const { once } = require('events');

const packages = [];

const parse = line => {
  if (line.startsWith('Package:')) {
    packages.push({ name: line.slice(9) });
  } else if (line.startsWith('Description:')) {
    packages[packages.length - 1].desc = line.slice(13);
  } else if (line.startsWith(' ')) {
    packages[packages.length - 1].desc += line;
  }
};

const sort = () => {
  return packages.sort((pkg1, pkg2) => {
    if (pkg1.name < pkg2.name) {
      return -1;
    }
    if (pkg1.name > pkg2.name) {
      return 1;
    }
    return 0;
  });
};

const processPackages = async () => {
  if (packages.length) {
    return packages;
  }

  try {
    const rl = createInterface({
      input: createReadStream('assets/status.real'),
      crlfDelay: Infinity
    });

    rl.on('line', line => {
      parse(line);
    });

    await once(rl, 'close');
  } catch (err) {
    console.error(err);
  }
  sort();
  return packages;
};

module.exports = { processPackages };
