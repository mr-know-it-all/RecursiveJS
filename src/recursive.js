'use strict';

const RecursiveJS = [
  adjust, allPass, anyPass, aperture, applySpec, applyTo, assoc, assocPath,
  compose, composeP, concat, construct, converge, countBy, curry,
  deepFlat, defaultTo, dissoc, drop,
  eqBy, equals, every,
  fill, filter, find, forEach,
  groupBy,
  includes, innerJoin, intersection, intersperse, invoker,
  juxt,
  length,
  map, mapObjIndexed, memoize, merge, mergeWith,
  nAry,
  objectEntries, objectValues, omit,
  partition, path, pathOr, pathSatisfies, pick, pluck, project,
  quickSort,
  range, reduce, reduceWhile, reverse,
  some, sortWith, strPaddEnd, strPaddStart, symetricDifference,
  take, takeWhile, tap, trampoline, transduce, transpose,
  uncurryN, unfold, union, uniqueBy, unless, until,
  xprod,
  zip, zipObj
];

module.exports = map(fn => fn.length > 1 && fn.name !== 'equals' ? curry(fn) : fn, RecursiveJS);

// adjust :: (a -> a) -> Number -> [a] -> [a]
function adjust(fn, index, xs) {
  return (function adjust([x, ...xs], currentIndex = 0, acc = []) {
    return currentIndex === index ? [...acc, fn(x), ...(xs ? xs : [])] : adjust(xs, currentIndex + 1, [...acc, x])
  })(xs);
}

// allPass :: ([* -> Boolean], [*]) -> Boolean
function allPass([p, ...ps], xs) {
  return (
    p === undefined ? true :
    !p(xs) ? false :
    allPass(ps, xs)
  );
}

// anyPass :: ([* -> Boolean], [*]) -> Boolean
function anyPass([p, ...ps], xs) {
  return (
    p === undefined ? false :
    p(xs) ? true :
    anyPass(ps, xs)
  );
}

// aperture :: (Number, [a]) -> [[a]]
function aperture(n, xs) {
  return (function aperture([x, ...xs], acc = []) {
    return n - 1 > xs.length ? acc : aperture(xs, [...acc, [x, ...take(n - 1, xs)]])
  })(xs);
}

// applySpec :: {Key: ((a, b ...) -> v)} -> ((a, b ...) -> {Key: v})
function applySpec(xo) {
  return (...args) => {
    return (function applySpec([x, ...xs], acc = {}) {
      return (
        x === undefined ? acc :
          typeof x[1] !== 'function' ?
            applySpec(xs, (acc[x[0]] = applySpec(objectEntries(x[1])), acc)) :
            applySpec(xs, (acc[x[0]] = x[1](args), acc))
      );
    })(objectEntries(xo));
  }
}

// applyTo :: a -> (a -> b) -> b
function applyTo(x) {
  return fn => fn(x);
}

// assoc :: String -> a -> {Key: v} -> {Key: v}
function assoc(k, v, xo) {
  return (function assoc(k, v, [x, ...xo], acc = {}) {
    return x === undefined ? acc : assoc(k, v, xo, (acc[x[0]] = x[1], acc[k] = v, acc));
  })(k, v, objectEntries(xo));
}

// assocPath :: [String] -> a -> {Key: v} -> {Key: v}
function assocPath(xs, v, xo) {
  return (function assocShallowCopy([x, ...xo], acc = {}) {
    return x === undefined ? (function applyPath([x, ...xs], path) {
      return length(xs) === 0 ? (path[x] = v, acc) : (!path[x] && (path[x] = {}), applyPath(xs, path[x]));
    })(xs, acc) : assocShallowCopy(xo, (acc[x[0]] = x[1], acc));
  })(objectEntries(xo));
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

// concat :: ([a], [a]) -> [a]
function concat(xs, ys) {
  return [...xs, ...(Array.isArray(ys) && ys || [ys])];
}

// construct :: (* -> {*}) -> (* -> {*})
function construct(constructorFn) {
  return (...args) => new constructorFn(...args);
}

// converge :: todo
function converge(cFn, fns) {
  return v => cFn(...map(fn => fn(v), fns));
}

// countBy :: (a -> String) -> [a] -> {*}
function countBy(fn) {
  return xs => (function countBy([x, ...xs], acc = {}) {
    return x === undefined ? acc : countBy(xs, (acc[fn(x[1])] ? acc[fn(x[1])]++ : acc[fn(x[1])] = 1, acc));
  })(objectEntries(xs));
}

// curry :: (* -> a) → (* -> a)
function curry(fn) {
  const arity = fn.length;
  return function applyArgs(...args) {
    return length(args) === arity ? fn(...args) : ((...nextArgs) => applyArgs(...args, ...nextArgs));
  };
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

// defaultTo :: a -> b -> a | b
function defaultTo(dflt) {
  return x => x !== undefined && x !== null && !Number.isNaN(x) ? x : dflt;
}

// dissoc :: (String, {Key: v}) -> {Key: v}
function dissoc(prop, xo) {
  return reduce((acc, [key, value]) => key === prop ? acc : (acc[key] = value, acc), objectEntries(xo), {});
}

// drop :: (Number, [a]) -> [a]
function drop(count, xs) {
  const isString = typeof xs === 'string';
  return (function drop(count, [x, ...xs]) {
  	return count - 1 === 0 ? isString ? xs.join('') : xs : drop(count - 1, xs);
  })(count, xs);
}

// eqBy :: (a -> b) -> a -> a -> Boolean
function eqBy(fn, a, b) {
  return fn(a) === fn(b);
}

function equals(a, b) {
  const isValueType = a => includes(typeof a, ['null', 'undefined', 'boolean', 'number', 'string', 'symbol']);
  const isObject = x => typeof x === 'object';
  const isArray = x => Array.isArray(x);
  const isFunction = x => typeof x === 'function';
  const getObjectType = x => isArray(x) && 'array' || (x && x.has && 'm-s-wm-ws' || 'object');
  const isHomogenousWithValueTypes = xs => every(x => isValueType(x) && typeof xs[0] === typeof x, xs);

  if(typeof a !== typeof b) return false;
  else if(isValueType(a) || isValueType(b)) return a === b;
  else if(isObject(a) && isObject(b) && getObjectType(a) !== getObjectType(b)) return false;
  else if(
    getObjectType(a) === 'array' &&
    getObjectType(b) === 'array' &&
    isHomogenousWithValueTypes(a) &&
    isHomogenousWithValueTypes(b)
  ) return `${quickSort(a)}` === `${quickSort(b)}`;
  else if(isFunction(a) && isFunction(b)) return a.toString() === b.toString();
  else return 'to be continued';
}

// every :: (a -> Boolean, [a]) -> Boolean
function every(fn, xs) {
  return (function every([x, ...xs]) {
    return x === undefined || (!fn(x) ? false : every(xs));
  })(xs);
}

// fill :: (a, Number) -> [a]
function fill(element, count) {
  return (function fill(count, acc = []) {
    return count === 0 && acc || fill(count - 1, [...acc, element]);
  })(count);
}

// filter :: (a -> Boolean, [a]) -> [a]
function filter(fn, xs) {
  return (function filter([x, ...xs], acc = []) {
    return x === undefined ? acc : filter(xs, fn(x) ? [...acc, x] : acc);
  })(xs);
}

// find :: (a -> Boolean, [a]) -> a | false
function find(fn, xs) {
  return (function find(fn, [x, ...xs]) {
    return x === undefined ? false : fn(x) ? x : find(fn, xs);
  })(fn, xs);
}

// forEach :: (a -> b, [a]) -> ()
function forEach(fn, xs) { // TODO: implement properly
  return (function forEach(xs, index = 0) {
    if(index < length(xs)) {
      xs[index] = fn(xs[index], index);
      return forEach(xs, index + 1);
    }
  })(xs);
}

// groupBy :: (a -> String) -> [a] -> {String: [a]}
function groupBy(groupFn, xo) {
  return (function groupBy([x, ...xo], acc = {}) {
    return (
      x === undefined ? acc :
        groupBy(xo, (acc[groupFn(x)] = acc[groupFn(x)] ? [...acc[groupFn(x)], x] : [x], acc))
    );
  })(xo);
}

// includes :: (a, [a]) -> Boolean
function includes(a, [x, ...xs]) {
  return x === undefined ? false : a === x ? true : includes(a, xs);
}

// innerJoin :: (((a, b) -> Boolean), [a], [b]) -> [a]
function innerJoin(fn, xs, ys) {
  return (function innerJoin(xs, [y, ...ys], acc = []) {
    return (
      y === undefined && acc || innerJoin(xs, ys, [...acc, ...filter(x => fn(x, y), xs)])
    );
  })(xs, ys);
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

// intersperse (a, [a]) -> [a]
function intersperse(n, xs) {
  return (
    function intersperse([x, ...xs], acc = []) {
      return x === undefined ? acc : intersperse(xs, length(acc) > 0 ? [...acc, n, x] : [...acc, x])
    }
  )(xs);
}


// invoker :: Number -> String -> (a -> b ... -> Object -> *)
function invoker(arity, method) {
  return function invoker(...args) {
    return (
      arity === length(args) - 1 ?
        args[length(args) - 1][method](...(take(length(args) - 1, args))) :
        (...nextArgs) => invoker(...args, ...nextArgs)
    );
  }
}

// juxt :: ([* -> a], [*]) -> [a]
function juxt(fns, xs) {
  return (function juxt([fn, ...fns], acc = []) {
    return fn === undefined && acc || juxt(fns, [...acc, fn(...xs)]);
  })(fns);
}

// length :: [a] -> Number
function length(xs) {
  return (function length([x, ...xs], count = 0) {
    return x === undefined ? count : length(xs, count + 1);
  })(xs);
}

// map :: (a -> b, [a]) -> [b]
function map(fn, xs) {
  return (function map([x, ...xs], acc = []) {
    return x === undefined && acc || map(xs, [...acc, fn(x)]);
  })(xs);
}


// mapObjIndexed :: ((*, String, Object) -> *) -> Object -> Object
function mapObjIndexed(fn, xo) {
  return (function mapObjIndexed([kv, ...kvs], acc = {}) {
    return kv === undefined ? acc : mapObjIndexed(kvs, (acc[kv[0]] = fn(kv[1], kv[0], xo), acc));
  })(objectEntries(xo));
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

// nAry :: Number -> (* -> a) -> (* -> a)
function nAry(arity, fn) {
  // TODO: find another way to restrict function length
  const nAry = (...args) => (args.length = arity, fn(...args));
  Object.defineProperty(nAry, 'length', {value: arity});

  return nAry;
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
  return (function partition([x, ...xs], acc = [[], []]) {
    return x === undefined && acc || partition(
      xs, pred(x) && [
        [...acc[0], x], acc[1]
      ] || [acc[0],
        [...acc[1], x]
      ]
    );
  })(xs);
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
function pathSatisfies(fn, xs, xo) {
  const data = path(xs, xo);
  return data && fn(data);
}

// pick :: ([Key], {Key: v}) -> {Key: v}
function pick(xs, xo) {
  return objectEntries(xo).reduce(
    (acc, v) => !find(x => x === v[0], xs) && acc || (acc[v[0]] = v[1], acc), {}
  );
}

// pluck :: Functor f => (Key, f {Key: v}) -> f v
function pluck(prop, xs) {
  return (function pluck([x, ...xs], acc = []) {
    return x === undefined && acc || pluck(xs, x[prop] && [...acc, x[prop]] || acc);
  })(xs);
}

// project :: ([Key], [{Key: v}]) -> [{Key: v}]
function project(xs, yss) {
  return (function project([ys, ...yss], acc = []) {
    return ys === undefined ? acc : project(yss, [
      ...acc, reduce((acc, x) => {
        if (ys[x]) acc[x] = ys[x];
        return acc;
      }, xs, {})
    ]);
  })(yss);
}

// quickSort :: Filterable f => f a -> f a
function quickSort([x, ...xs]) {
  return x === undefined && [] || [
    ...quickSort(filter(y => y <= x, xs)),
    x,
    ...quickSort(filter(y => y > x, xs))
  ];
}

// range :: Number -> Number -> [Number]
function range(from, to) {
  return (function range(from, to, acc = []) {
    return from === to ? acc : range(from + 1, to, [...acc, from]);
  })(from, to)
}

// reduce :: ((a, b) -> a, [b], a) -> a
function reduce(fn, xs, acc) {
  return (function reduce(fn, [x, ...xs], acc) {
    return x === undefined ? acc : reduce(fn, xs, fn(acc, x));
  })(fn, xs, acc);
}

// reduceWhile :: (((a, b) -> Boolean), ((a, b) -> a), [b]) -> a
function reduceWhile(pred, fn, [x, ...xs], acc) {
  return x === undefined || !pred(x) ? acc : reduceWhile(pred, fn, xs, fn(acc, x));
}

// reverse :: [a] -> [a]
function reverse(xs) {
  return (function reverse([x, ...xs], acc = []) {
    return x === undefined ? acc : reverse(xs, [x, ...acc]);
  })(xs);
}

// some :: (a -> Boolean, [a]) -> Boolean
function some(fn, xs) {
  return (function some([x, ...xs]) {
    return x === undefined ? false : fn(x) || some(xs);
  })(xs);
}

// sortWith :: ((a, a) -> 1 | -1 | 0, [a]) -> [a]
function sortWith(fn, [x, ...xs]) {
  return x === undefined && [] || [
  	...quickSort(filter(y => fn(x, y) === 1, xs)),
  	x,
  	...quickSort(filter(y => fn(x, y) === -1, xs))
  ];
}

// strPaddEnd :: (String, Number, String) -> String
function strPaddEnd(elem, count, xs) {
  return length(xs) >= count ? xs : strPaddEnd(elem, count, `${xs}${elem}`);
}

// strPaddStart :: (String, Number, String) -> String
function strPaddStart(elem, count, xs) {
  return length(xs) >= count ? xs : strPaddStart(elem, count, `${elem}${xs}`);
}


// symetricDifference :: [*] -> [*] -> [*]
function symetricDifference(__xs, __ys) {
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
  return (function takeWhile([x, ...xs], acc = []) {
    return (x === undefined || !fn(x)) && acc || takeWhile(xs, [...acc, x]);
  })(xs);
}

// tap :: ((a → *), a) -> a
function tap(fn, x) {
  return (fn(x), x);
}

// trampoline :: (a -> b) -> a -> b
function trampoline(fn) {
  return (...args) => {
    let result = fn(...args);
    while(typeof result === 'function') result = result();
    return result;
  };
}

// Functor F => transduce :: [F* -> F*, F* -> F*, ...] -> F* -> F*
// TODO: this doesn't seem to be a classic transduce, will revisit it
function transduce(ops, xs) {
  return (function transduce(ops, [x, ...xs], acc = []) {
    const applyOps = ([op, ...ops], x) => op === undefined ? x : !op(x) ? undefined : applyOps(ops, op(x));

    return x === undefined ? acc : transduce(ops, xs, [...acc, ...(applyOps(reverse(ops), [x]) || [])]);
  })(ops, xs);
}

// transpose :: [[a]] -> [[a]]
function transpose(xs) {
  let maxIndex = reduce((acc, v) => length(v) > acc ? length(v) : acc, xs, 0) - 1;

  return (function transpose(index = 0, acc = []) {
    // TODO: after forEach fix, use it instead of map
    map(x => acc[index] = acc[index] ? [...acc[index], x[index] || null] : [x[index] || null], xs);

    return index === maxIndex ? map(xs => filter(x => x !== null, xs), acc) : transpose(index + 1, acc);
  })();
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

// unfold :: (a -> [b]) -> a -> [b]
function unfold(fn, seed, acc = []) {
  const nextValue = fn(seed);
  return nextValue ? unfold(fn, nextValue[1], [...acc, nextValue[0]]) : acc;
}

// union :: [*] -> [*] -> [*]
function union(xs, ys) {
  return (function union([x,  ...xs], ys, acc = []) {
    return (
      x === undefined && ys === undefined ? acc :
        x === undefined && ys !== undefined ? union(ys, undefined, acc) :
          union(xs, ys, [...(find(y => y === x, acc) ? acc : [...acc, x])])
    );
  })(xs, ys);
}

// uniqueBy :: (a -> a, [a]) -> [a]
function uniqueBy(fn, xs) {
  return (function uniqueBy([x, ...xs], acc = [x]) {
    return (
      x === undefined && acc || uniqueBy(
        xs, !find(y => fn(y) === fn(x), acc) && [...acc, x] || acc
      )
    );
  })(xs);
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
  return (function xprod([x, ...xs], acc = []) {
    return x === undefined ? acc : xprod(xs, [...acc, ...map(y => [x, y], ys)]);
  })(xs);
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
