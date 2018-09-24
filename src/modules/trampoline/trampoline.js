// trampoline :: (a -> b) -> a -> b
function trampoline(fn) {
  return (...args) => {
    let result = fn(...args);
    while(typeof result === 'function') result = result();
    return result;
  };
}

module.exports = trampoline;