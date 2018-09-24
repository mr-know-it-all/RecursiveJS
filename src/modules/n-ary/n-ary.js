// nAry :: Number -> (* -> a) -> (* -> a)
function nAry(arity, fn) {
  // TODO: find another way to restrict function length
  const nAry = (...args) => (args.length = arity, fn(...args));
  Object.defineProperty(nAry, 'length', {value: arity});

  return nAry;
}

module.exports = nAry;