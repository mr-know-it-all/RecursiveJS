// pluck :: Functor f => (Key, f {Key: v}) -> f v
function pluck(prop, xs) {
  return (function pluck([x, ...xs], acc = []) {
    return x === undefined && acc || pluck(xs, x[prop] && [...acc, x[prop]] || acc);
  })(xs);
}


module.exports = pluck;