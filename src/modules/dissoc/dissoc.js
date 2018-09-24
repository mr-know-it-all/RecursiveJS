const objectEntries = require('../object-entries/object-entries.js');
const reduce = require('../reduce/reduce.js');

// dissoc :: (String, {Key: v}) -> {Key: v}
function dissoc(prop, xo) {
  return reduce((acc, [key, value]) => key === prop ? acc : (acc[key] = value, acc), objectEntries(xo), {});
}

module.exports = dissoc;