const includes = require('../includes/includes.js');
const every = require('../every/every.js');
const quickSort = require('../quick-sort/quick-sort.js');

function equals(a, b) {
  const isValueType = a => includes(typeof a, ['null', 'undefined', 'boolean', 'number', 'string', 'symbol']);
  const isObject = x => typeof x === 'object';
  const isArray = x => Array.isArray(x);
  const isFunction = x => typeof x === 'function';
  const getObjectType = x => isArray(x) && 'array' || (x && x.has && 'm-s-wm-ws' || 'object');
  const isHomogenousWithValueTypes = xs => every(x => isValueType(x) && typeof xs[0] === typeof x, xs);

  if(typeof a !== typeof b) return false;
  else if(isValueType(a) || isValueType(b)) return a === b;
  else if(isObject(a) && isObject(b) && getObjectType(a) !== getObjectType(b)) return false;
  else if(
    getObjectType(a) === 'array' &&
    getObjectType(b) === 'array' &&
    isHomogenousWithValueTypes(a) &&
    isHomogenousWithValueTypes(b)
  ) return `${quickSort(a)}` === `${quickSort(b)}`;
  else if(isFunction(a) && isFunction(b)) return a.toString() === b.toString();
  else return 'to be continued';
}

module.exports = equals;