const trampoline = require('../trampoline/trampoline.js');

// millerRabin :: (Number := Int, Number := Int) -> Boolean
function millerRabin(n, k = 10) {
  // handle simple cases
  if(n === 2) return true;
  if(n < 2 || n % 2 === 0) return false;

  // compute d and r such that n - 1 = d * 2 ** r
  let [d, r] = (function decomposeNumber(d = n - 1, r = 1) {
    return (
      d % 2 === 0
      ? decomposeNumber(d / 2, r + 1)
      : [d, r]
    );
  })();

  // repeat k times to increase probability of result
  return trampoline(function computeProbabilityK(countK = 0) {
    // all checks pass and there are no more k tests to run, probably prime
    if(countK === k) return true;

    // random a in range [2, n-2]
    let a = Math.floor(Math.random() * (n - 4)) + 2;

    // compute x as a ** d mod n
    let x = trampoline(function computeX(countCX = 0, x = 1) {
      return countCX === d ? x : () => computeX(countCX + 1, (x * a) % n);
    })();

    // continue to next kth probability test
    if(x === 1 || x === n - 1) return () => computeProbabilityK(countK + 1);

    // while d !== 1 || n - 1, max r - 1 times, decompose x as x ** 2 mod n
    return trampoline(function decomposeX(countDX = 0) {
      // if x doesn't become n - 1 and we are above r - 1
      if(countDX === r) return false;

      x = (x * x) % n;
      if(x === 1) return false;
      if(x === n - 1) return () => computeProbabilityK(countK + 1);

      return () => decomposeX(countDX + 1);
    })(x);
  })();
}

module.exports = millerRabin;
