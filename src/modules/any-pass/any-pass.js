// anyPass :: ([* -> Boolean], [*]) -> Boolean
function anyPass([p, ...ps], xs) {
  return (
    p === undefined ? false :
    p(xs) ? true :
    anyPass(ps, xs)
  );
}

module.exports = anyPass;
