const path = require('path');

const root = loc => path.resolve(__dirname, `../../${loc || ''}`);

const aliases = {
  '~': root(),
  '@server': root('server'),
  '@client': root('client'),
  config: root('config/config'),
};

const processAliases = list => {
  const aliasArr = [];

  Object.keys(list).map(key => {
    aliasArr.push([key, list[key]]);
  });
  return aliasArr;
};

exports.aliasesArray = processAliases(aliases);
exports.alias = aliases;
