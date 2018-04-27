'use strict';

module.exports = {
  reverse,
  forEach,
  length,
  reduce,
  map,
  curry,
  compose,
  filter,
  some,
  every,
  find,
  fill,
  quickSort,
  take,
  takeWhile,
  composeP,
  innerJoin,
  intersection,
  uniqueBy,
  juxt,
  project,
  zip,
  memoize,
  allPass,
  merge,
  symmetricDifference,
  reduceWhile,
  pluck,
  pick,
  omit,
  uncurryN,
  path,
  partition,
  concat,
  mergeWith,
  pathOr,
  pathSatisfies,
  unless,
  until,
  xprod,
  zipObj
};

// reverse :: [a] -> [a]
function reverse([x, ...xs], acc = []) {
  return x === undefined ? acc : reverse(xs, [x, ...acc]);
}

// forEach :: (a -> b, [a]) -> ()
function forEach(fn, xs, index = 0) {
  if (index < length(xs)) {
    xs[index] = fn(xs[index], index);
    return forEach(fn, xs, index + 1);
  }
}

// length :: [a] -> Number
function length([x, ...xs], count = 0) {
  return x === undefined ? count : length(xs, count + 1);
}

// reduce :: ((a, b) -> a, [b], a) -> a
function reduce(fn, [x, ...xs], acc) {
  return x === undefined && acc || reduce(fn, xs, fn(acc, x));
}

// map :: (a -> b, [a]) -> [b]
function map(fn, [x, ...xs], acc = []) {
  return x === undefined && acc || map(fn, xs, [...acc, fn(x)]);
}

// curry :: (* -> a) → (* -> a)
function curry(fn) {
  const arity = fn.length;

  const applyArgs = (...args) =>
    length(args) === arity ? fn(...args) : ((...nextArgs) => applyArgs(...args, ...nextArgs));

  return applyArgs;
}

// compose :: (c -> d, ..., b -> c, a -> b) -> (x -> (a -> b -> c -> d))
function compose(...fns) {
  return value => reduce((acc, fn) => fn(acc), reverse(fns), value);
}

// filter :: (a -> Boolean, [a]) -> [a]
function filter(fn, [x, ...xs], acc = []) {
  return x === undefined && acc || filter(fn, xs, fn(x) && [...acc, x] || acc);
}

// some :: (a -> Boolean, [a]) -> Boolean
function some(fn, [x, ...xs]) {
  return x === undefined ? false : fn(x) || some(fn, xs);
}

// every :: (a -> Boolean, [a]) -> Boolean
function every(fn, [x, ...xs]) {
  return x === undefined || (!fn(x) ? false : every(fn, xs));
}

// find :: (a -> Boolean, [a]) -> a | false
function find(fn, [x, ...xs]) {
  return x === undefined ? false : fn(x) ? x : find(fn, xs);
}

// fill :: (a, Number) -> [a]
function fill(element, count, acc = []) {
  return count === 0 && acc || fill(element, count - 1, [...acc, element]);
}

// quickSort :: Filterable f => f a -> f a
function quickSort([x, ...xs]) {
  return x === undefined && [] || [
    ...quickSort(filter(y => y <= x, xs)),
    x,
    ...quickSort(filter(y => y > x, xs))
  ];
}

// take :: (Number, [a]) -> [a]
function take(count, [x, ...xs], acc = []) {
  return count === 0 && acc || take(count - 1, xs, [...acc, x]);
}

// takeWhile :: (a -> Boolean, [a]) -> [a]
function takeWhile(fn, [x, ...xs], acc = []) {
  return (x === undefined || !fn(x)) && acc || takeWhile(fn, xs, [...acc, x]);
}

// composeP :: ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
function composeP(...fns) {
  return initialValue =>
    (async function applyFunc([fn, ...fns], value) {
      return fn ? applyFunc(fns, await (fn(value))) : value;
    })(reverse(fns), initialValue);
}

// innerJoin :: (((a, b) -> Boolean), [a], [b]) -> [a]
function innerJoin(fn, xs, [y, ...ys], acc = []) {
  return (
    y === undefined && acc || innerJoin(fn, xs, ys, [...acc, ...filter(x => fn(x, y), xs)])
  );
}

// intersection :: ([*], [*]) -> [*]
function intersection([x, ...xs], ys, acc = []) {
  return (
    x === undefined && compose(quickSort, curry(uniqueBy)(x => x))(acc) || intersection(
      xs, ys,
      find(y => y === x, ys) && [...acc, x] || acc
    )
  );
}

// uniqueBy :: (a -> a, [a]) -> [a]
function uniqueBy(fn, [x, ...xs], acc = [x]) {
  return (
    x === undefined && acc || uniqueBy(
      fn,
      xs, !find(y => fn(y) === fn(x), acc) && [...acc, x] || acc
    )
  );
}

// juxt :: ([* -> a], [*]) -> [a]
function juxt([fn, ...fns], xs, acc = []) {
  return fn === undefined && acc || juxt(fns, xs, [...acc, fn(...xs)]);
}

// memoize :: (* -> a) -> a
function memoize(fn, dataStore = new Map()) {
  return function getValue(x, y) {
    return (
      dataStore.get(`${x}${y}`) ||
      dataStore.set(`${x}${y}`, fn(x, y)) && getValue(x, y)
    );
  };
}

// project :: ([Key], [{Key: v}]) -> [{Key: v}]
function project(xs, [ys, ...yss], acc = []) {
  return ys === undefined ? acc : project(xs, yss, [
    ...acc, reduce((acc, x) => {
      if (ys[x]) acc[x] = ys[x];
      return acc;
    }, xs, {})
  ]);
}

// allPass :: ([a -> Boolean], [a]) -> Boolean
function allPass(ps, [x, ...xs]) {
  return (
    x === undefined ? true :
    some(p => !p(x), ps) ? false :
    allPass(ps, xs)
  );
}

// zip :: ([a], [b]) -> [a, b]
function zip([x, ...xs], [y, ...ys], acc = []) {
  return (
    (x === undefined || y === undefined) && acc ||
    zip(xs, ys, [...acc, [x, y]])
  );
}

// merge :: ({Key: v}, {Key: v}) -> {Key: v}
function merge(xo, yo) {
  return (
    reduce(
      (acc, v) => (acc[v[0]] = v[1], acc),
      uniqueBy(
        (x) => x[0], [...Object.entries(yo), ...Object.entries(xo)]
      ), {})
  );
}

// omit :: ([String], {String: *}) -> {String: *}
function omit(xs, xo) {
  return Object.entries(xo).reduce(
    (acc, v) => find(x => x === v[0], xs) && acc || (acc[v[0]] = v[1], acc), {}
  );
}

// pick :: ([Key], {Key: v}) -> {Key: v}
function pick(xs, xo) {
  return Object.entries(xo).reduce(
    (acc, v) => !find(x => x === v[0], xs) && acc || (acc[v[0]] = v[1], acc), {}
  );
}

// pluck :: Functor f => (Key, f {Key: v}) -> f v
function pluck(prop, [x, ...xs], acc = []) {
  return x === undefined && acc || pluck(prop, xs, x[prop] && [...acc, x[prop]] || acc);
}

// reduceWhile :: (((a, b) -> Boolean), ((a, b) -> a), [b]) -> a
function reduceWhile(pred, fn, [x, ...xs], acc) {
  return x === undefined || !pred(x) && acc || reduceWhile(pred, fn, xs, fn(acc, x));
}

// symmetricDifference :: [*] -> [*] -> [*]
function symmetricDifference(__xs, __ys) {
  return (function diff([x, ...xs], ys, acc = [], done = false) {
    return (
      x === undefined && done && acc ||
      x === undefined && !done && diff(__ys, __xs, acc, true) ||
      diff(xs, ys, !find(y => y === x, ys) && [...acc, x] || acc, done)
    );
  })(__xs, __ys);
}

// partition :: ((a -> Boolean), a) -> [[a], [a]]
function partition(pred, [x, ...xs], acc = [
  [],
  []
]) {
  return x === undefined && acc || partition(
    pred, xs, pred(x) && [
      [...acc[0], x], acc[1]
    ] || [acc[0],
      [...acc[1], x]
    ]
  );
}

// path :: ([Key], {a}) -> a | Undefined
function path([x, ...xs], xo) {
  return (
    length(xs) === 0 && (xo[x] || undefined) ||
    xo[x] !== undefined && path(xs, xo[x]) ||
    undefined
  );
}

// uncurryN :: (Number, (a -> b)) -> (a -> c | throw)
function uncurryN(arity, fn) {
  return (...args) => {
    if (length(args) !== arity)
      throw `the function ${fn.name} expects ${arity} arguments and it was called with only ${length(args)}`;
    else
      return reduce((fn, x) => fn(x), args, fn);
  };
}

// concat :: ([a], [a]) -> [a]
function concat(xs, ys) {
  return [...xs, ...(Array.isArray(ys) && ys || [ys])];
}

// mergeWith :: (((a, a) -> a), {a}, {a}) -> {a}
function mergeWith(fn, xo, yo) {
  return (
    reduce(
      (acc, v) => (acc[v[0]] = acc[v[0]] ? fn(v[1], acc[v[0]]) : v[1], acc), [...Object.entries(yo), ...Object.entries(xo)], {})
  );
}

// pathOr :: (a, [Key], {a}) -> a
function pathOr(dflt, xs, xo) {
  return path(xs, xo) || dflt;
}

// pathSatisfies :: ((a -> Boolean), [Key], {a}) -> Boolean
function pathSatisfies(fn, xs, xo, data) {
  return (data = path(xs, xo), data && fn(data));
}

// unless :: (a -> Boolean, a -> a) -> a -> a | null
function unless(pred, fn) {
  return x => pred(x) ? fn(x) : null;
}

// until :: (a -> Boolean, a -> a, a) -> a
function until(pred, fn, x) {
  return pred(x) ? x : until(pred, fn, fn(x));
}

// xprod :: ([a], [b])-> [[a, b]]
function xprod([x, ...xs], ys, acc = []) {
  return x === undefined ? acc : xprod(xs, ys, [...acc, ...map(y => [x, y], ys)]);
}

// zipObj :: ([String], [*]) -> {String: *}
function zipObj([x, ...xs], [y, ...ys], acc = {}) {
  return x === undefined || y === undefined ? acc : zipObj(xs, ys, (acc[x] = y, acc))
}