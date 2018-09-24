// memoize :: (* -> a) -> a
function memoize(fn) {
  return (function memoize(fn, dataStore = new Map()) {
    return function getValue(...args) {
      let dataKey = JSON.stringify(args);
      return (
        dataStore.get(dataKey) ||
        dataStore.set(dataKey, fn(...args)) && getValue(...args)
      );
    };
  })(fn);
}

module.exports = memoize;