// whyBird :: whyform fn => fn -> *
function whyBird(fn) {
  return (
    (rec => (...args) => fn(rec(rec), ...args))
    (rec => (...args) => fn(rec(rec), ...args))
  );
}

module.exports = whyBird;