// defaultTo :: a -> b -> a | b
function defaultTo(dflt) {
  return x => x !== undefined && x !== null && !Number.isNaN(x) ? x : dflt;
}

module.exports = defaultTo;