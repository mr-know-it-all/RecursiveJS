const length = require('../length/length.js');

// strPaddStart :: (String, Number, String) -> String
function strPaddStart(elem, count, xs) {
  return length(xs) >= count ? xs : strPaddStart(elem, count, `${elem}${xs}`);
}

module.exports = strPaddStart;