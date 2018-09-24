// construct :: (* -> {*}) -> (* -> {*})
function construct(constructorFn) {
  return (...args) => new constructorFn(...args);
}

module.exports = construct;