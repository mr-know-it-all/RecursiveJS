// drop :: (Number, [a]) -> [a]
function drop(count, xs) {
  const isString = typeof xs === 'string';
  return (function drop(count, [x, ...xs]) {
  	return count - 1 === 0 ? isString ? xs.join('') : xs : drop(count - 1, xs);
  })(count, xs);
}

module.exports = drop;