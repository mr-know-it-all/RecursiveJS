const length = require('../length/length.js');

// strPaddEnd :: (String, Number, String) -> String
function strPaddEnd(elem, count, xs) {
  return length(xs) >= count ? xs : strPaddEnd(elem, count, `${xs}${elem}`);
}

module.exports = strPaddEnd;