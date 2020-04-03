// kadane :: [Number] -> Number
function kadane(list) {
  return (function kadane([x, ...xs], { localMax, globalMax }) {
    if(x === undefined) return globalMax;

    const nextLocalMax = Math.max(x, x + localMax);
    const nextGlobalMax = Math.max(nextLocalMax, globalMax);

    return kadane(xs, { localMax: nextLocalMax, globalMax: nextGlobalMax });
  })(list, {localMax: 0, globalMax: -Infinity })
}

module.exports = kadane;
