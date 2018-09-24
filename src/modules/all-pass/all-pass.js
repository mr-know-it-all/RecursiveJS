// allPass :: ([* -> Boolean], [*]) -> Boolean
function allPass([p, ...ps], xs) {
  return (
    p === undefined ? true :
    !p(xs) ? false :
    allPass(ps, xs)
  );
}

module.exports = allPass;