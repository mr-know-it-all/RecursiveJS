const length = require('../length/length.js');
const take = require('../take/take.js');
const drop = require('../drop/drop.js');
const reduce = require('../reduce/reduce.js');
const concat = require('../concat/concat.js');
const curry = require('../curry/curry.js');
const compose = require('../compose/compose.js');

// sum :: [Number | String] -> Number | String
const join = xs => reduce((acc, val) => acc + val, xs, '');

// takeNChars :: Integer -> (String -> String)
const takeNChars = n => compose(join, curry(take)(n));

// dropNChars :: Integer -> (String -> String)
const dropNChars = n => compose(join, curry(drop)(n));

// allSplitGroups :: String -> [[String]]
function allSplitGroups(string) {
  let result = [];
  (function allSplitGroups(accum, string) {
    result = concat(result, [concat(accum, string)]);
    (function forAnyRemainingChar(i) {
        if(i === string.length) return;
        allSplitGroups([...accum, takeNChars(i)(string)], dropNChars(i)(string));
        forAnyRemainingChar(i + 1);
      })(1);
  })([], string);
  return result;
}

module.exports = allSplitGroups;
