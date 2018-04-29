'use strict';

module.exports = {
  allPass,
  compose,
  composeP,
  concat,
  curry,
  deepFlat,
  every,
  fill,
  filter,
  find,
  forEach,
  includes,
  innerJoin,
  intersection,
  juxt,
  length,
  map,
  memoize,
  merge,
  mergeWith,
  objectEntries,
  objectValues,
  omit,
  partition,
  path,
  pathOr,
  pathSatisfies,
  pick,
  pluck,
  project,
  quickSort,
  reduce,
  reduceWhile,
  reverse,
  some,
  symmetricDifference,
  take,
  takeWhile,
  uncurryN,
  uniqueBy,
  unless,
  until,
  xprod,
  zip,
  zipObj
};

// allPass :: ([a -> Boolean], [a]) -> Boolean
function allPass(ps, [x, ...xs]) {
  return (
    x === undefined ? true :
    some(p => !p(x), ps) ? false :
    allPass(ps, xs)
  );
}

// concat :: ([a], [a]) -> [a]
function concat(xs, ys) {
  return [...xs, ...(Array.isArray(ys) && ys || [ys])];
}

// compose :: (c -> d, ..., b -> c, a -> b) -> (x -> (a -> b -> c -> d))
function compose(...fns) {
  return value => reduce((acc, fn) => fn(acc), reverse(fns), value);
}

// composeP :: ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
function composeP(...fns) {
  return initialValue =>
    (async function applyFunc([fn, ...fns], value) {
      return fn ? applyFunc(fns, await (fn(value))) : value;
    })(reverse(fns), initialValue);
}

// curry :: (* -> a) → (* -> a)
function curry(fn) {
  const arity = fn.length;

  const applyArgs = (...args) =>
    length(args) === arity ? fn(...args) : ((...nextArgs) => applyArgs(...args, ...nextArgs));

  return applyArgs;
}

// deepFlat :: [[[*]]] -> [*]
function deepFlat(xs) {
  return (function deepFlat([x, ...xs], acc = []) {
    return (
      x === undefined ?
        acc :
        Array.isArray(x) && deepFlat([...x, ...xs], acc) || deepFlat(xs, [...acc, x])
    );
  })(xs);
}

// every :: (a -> Boolean, [a]) -> Boolean
function every(fn, xs) {
  return (function every(fn, [x, ...xs]) {
    return x === undefined || (!fn(x) ? false : every(fn, xs));
  })(fn, xs);
}

// fill :: (a, Number) -> [a]
function fill(element, count) {
  return (function fill(element, count, acc = []) {
    return count === 0 && acc || fill(element, count - 1, [...acc, element]);
  })(element, count);
}

// filter :: (a -> Boolean, [a]) -> [a]
function filter(fn, xs) {
  return (function filter(fn, [x, ...xs], acc = []) {
    return x === undefined && acc || filter(fn, xs, fn(x) && [...acc, x] || acc);
  })(fn, xs);
}

// find :: (a -> Boolean, [a]) -> a | false
function find(fn, xs) {
  return (function find(fn, [x, ...xs]) {
    return x === undefined ? false : fn(x) ? x : find(fn, xs);
  })(fn, xs);
}

// forEach :: (a -> b, [a]) -> ()
function forEach(fn, xs) {
  return (function forEach(fn, xs, index = 0) {
    if(index < length(xs)) {
      xs[index] = fn(xs[index], index);
      return forEach(fn, xs, index + 1);
    }
  })(fn, xs);
}

// includes :: (a, [a]) -> Boolean
function includes(a, [x, ...xs]) {
  return x === undefined ? false : a === x ? true : includes(a, xs);
}

// innerJoin :: (((a, b) -> Boolean), [a], [b]) -> [a]
function innerJoin(fn, xs, ys) {
  return (function innerJoin(fn, xs, [y, ...ys], acc = []) {
    return (
      y === undefined && acc || innerJoin(fn, xs, ys, [...acc, ...filter(x => fn(x, y), xs)])
    );
  })(fn, xs, ys);
}

// intersection :: ([*], [*]) -> [*]
function intersection(xs, ys) {
  return (function intersection([x, ...xs], ys, acc = []) {
    return (
      x === undefined && compose(quickSort, curry(uniqueBy)(x => x))(acc) || intersection(
        xs, ys,
        find(y => y === x, ys) && [...acc, x] || acc
      )
    );
  })(xs, ys);
}

// juxt :: ([* -> a], [*]) -> [a]
function juxt(fns, xs) {
  return (function juxt([fn, ...fns], xs, acc = []) {
    return fn === undefined && acc || juxt(fns, xs, [...acc, fn(...xs)]);
  })(fns, xs);
}

// length :: [a] -> Number
function length(xs) {
  return (function length([x, ...xs], count = 0) {
    return x === undefined ? count : length(xs, count + 1);
  })(xs);
}

// map :: (a -> b, [a]) -> [b]
function map(fn, xs) {
  return (function map(fn, [x, ...xs], acc = []) {
    return x === undefined && acc || map(fn, xs, [...acc, fn(x)]);
  })(fn, xs);
}

// memoize :: (* -> a) -> a
function memoize(fn) {
  return (function memoize(fn, dataStore = new Map()) {
    return function getValue(x, y) {
      return (
        dataStore.get(`${x}${y}`) ||
        dataStore.set(`${x}${y}`, fn(x, y)) && getValue(x, y)
      );
    };
  })(fn);
}

// merge :: ({Key: v}, {Key: v}) -> {Key: v}
function merge(xo, yo) {
  return (
    reduce(
      (acc, v) => (acc[v[0]] = v[1], acc),
      uniqueBy(
        (x) => x[0], [...objectEntries(yo), ...objectEntries(xo)]
      ), {})
  );
}

// mergeWith :: (((a, a) -> a), {a}, {a}) -> {a}
function mergeWith(fn, xo, yo) {
  return (
    reduce(
      (acc, v) => (acc[v[0]] = acc[v[0]] ? fn(v[1], acc[v[0]]) : v[1], acc), [...objectEntries(yo), ...objectEntries(xo)], {})
  );
}

// omit :: ([String], {String: *}) -> {String: *}
function omit(xs, xo) {
  return objectEntries(xo).reduce(
    (acc, v) => find(x => x === v[0], xs) && acc || (acc[v[0]] = v[1], acc), {}
  );
}

// objectValues :: {Key: *} -> [[Key, *]]
function objectEntries(xo) {
  return (function objectEntries(xo, index = 0, acc = []) {
    return Object.keys(xo)[index] === undefined ? acc : objectEntries(
      xo,
      index + 1,
      [...acc, [Object.keys(xo)[index], xo[Object.keys(xo)[index]]]]);
  })(xo);
}

// objectValues :: {Key: *} -> [*]
function objectValues(xo) {
  return (function objectValues(xo, index = 0, acc = []) {
    return Object.keys(xo)[index] === undefined ? acc : objectValues(
      xo,
      index + 1,
      [...acc, xo[Object.keys(xo)[index]]]);
  })(xo);
}


// partition :: ((a -> Boolean), [a]) -> [[a], [a]]
function partition(pred, xs) {
  return (function partition(pred, [x, ...xs], acc = [
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
  })(pred, xs);
}

// path :: ([Key], {a}) -> a | Undefined
function path([x, ...xs], xo) {
  return (
    length(xs) === 0 && (xo[x] || undefined) ||
    xo[x] !== undefined && path(xs, xo[x]) ||
    undefined
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

// pick :: ([Key], {Key: v}) -> {Key: v}
function pick(xs, xo) {
  return objectEntries(xo).reduce(
    (acc, v) => !find(x => x === v[0], xs) && acc || (acc[v[0]] = v[1], acc), {}
  );
}

// pluck :: Functor f => (Key, f {Key: v}) -> f v
function pluck(prop, xs) {
  return (function pluck(prop, [x, ...xs], acc = []) {
    return x === undefined && acc || pluck(prop, xs, x[prop] && [...acc, x[prop]] || acc);
  })(prop, xs);
}

// project :: ([Key], [{Key: v}]) -> [{Key: v}]
function project(xs, yss) {
  return (function project(xs, [ys, ...yss], acc = []) {
    return ys === undefined ? acc : project(xs, yss, [
      ...acc, reduce((acc, x) => {
        if (ys[x]) acc[x] = ys[x];
        return acc;
      }, xs, {})
    ]);
  })(xs, yss);
}

// quickSort :: Filterable f => f a -> f a
function quickSort([x, ...xs]) {
  return x === undefined && [] || [
    ...quickSort(filter(y => y <= x, xs)),
    x,
    ...quickSort(filter(y => y > x, xs))
  ];
}

// reduce :: ((a, b) -> a, [b], a) -> a
function reduce(fn, xs, acc) {
  return (function reduce(fn, [x, ...xs], acc) {
    return x === undefined && acc || reduce(fn, xs, fn(acc, x));
  })(fn, xs, acc);
}

// reduceWhile :: (((a, b) -> Boolean), ((a, b) -> a), [b]) -> a
function reduceWhile(pred, fn, [x, ...xs], acc) {
  return x === undefined || !pred(x) && acc || reduceWhile(pred, fn, xs, fn(acc, x));
}

// reverse :: [a] -> [a]
function reverse(xs) {
  return (function reverse([x, ...xs], acc = []) {
    return x === undefined ? acc : reverse(xs, [x, ...acc]);
  })(xs);
}

// some :: (a -> Boolean, [a]) -> Boolean
function some(fn, xs) {
  return (function some(fn, [x, ...xs]) {
    return x === undefined ? false : fn(x) || some(fn, xs);
  })(fn, xs);
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

// take :: (Number, [a]) -> [a]
function take(count, xs) {
  return (function take(count, [x, ...xs], acc = []) {
    return count === 0 && acc || take(count - 1, xs, [...acc, x]);
  })(count, xs);
}

// takeWhile :: (a -> Boolean, [a]) -> [a]
function takeWhile(fn, xs) {
  return (function takeWhile(fn, [x, ...xs], acc = []) {
    return (x === undefined || !fn(x)) && acc || takeWhile(fn, xs, [...acc, x]);
  })(fn, xs);
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

// uniqueBy :: (a -> a, [a]) -> [a]
function uniqueBy(fn, xs) {
  return (function uniqueBy(fn, [x, ...xs], acc = [x]) {
    return (
      x === undefined && acc || uniqueBy(
        fn,
        xs, !find(y => fn(y) === fn(x), acc) && [...acc, x] || acc
      )
    );
  })(fn, xs);
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
function xprod(xs, ys) {
  return (function xprod([x, ...xs], ys, acc = []) {
    return x === undefined ? acc : xprod(xs, ys, [...acc, ...map(y => [x, y], ys)]);
  })(xs, ys);
}

// zip :: ([a], [b]) -> [a, b]
function zip(xs, ys) {
  return (function zip([x, ...xs], [y, ...ys], acc = []) {
    return (
      (x === undefined || y === undefined) && acc ||
      zip(xs, ys, [...acc, [x, y]])
    );
  })(xs, ys);
}

// zipObj :: ([String], [*]) -> {String: *}
function zipObj(xs, ys) {
  return (function zipObj([x, ...xs], [y, ...ys], acc = {}) {
    return x === undefined || y === undefined ? acc : zipObj(xs, ys, (acc[x] = y, acc))
  })(xs, ys);
}
