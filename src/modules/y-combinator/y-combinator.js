// Ycombinator :: Y form fn => fn -> *
function Ycombinator(fn) {
  return (
    (rec => arg => fn(rec(rec))(arg))
    (rec => arg => fn(rec(rec))(arg))
  );
}

module.exports = Ycombinator;