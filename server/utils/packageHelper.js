const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const { once } = require('events');

const processPackages = async () => {
  const packages = [];
  try {
    const rl = createInterface({
      input: createReadStream('server/assets/status.real'),
      crlfDelay: Infinity
    });

    rl.on('line', line => {
      if (line.startsWith('Package:')) {
        packages.push({ name: line.slice(9) });
      } else if (line.startsWith('Description:')) {
        packages[packages.length - 1].desc = line.slice(13);
      } else if (line.startsWith(' ')) {
        packages[packages.length - 1].desc += line;
      }
    });

    await once(rl, 'close');
  } catch (err) {
    console.error(err);
  }
  return packages;
};

const sort = packages => {
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

module.exports = { processPackages, sort };
