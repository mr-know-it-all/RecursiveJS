'use strict';

// TODO: replace with script
const adjust = require('./modules/adjust/adjust.js');
const allAnagrams = require('./modules/all-anagrams/all-anagrams.js');
const allPass = require('./modules/all-pass/all-pass.js');
const allPermutations = require('./modules/all-permutations/all-permutations.js');
const anyPass = require('./modules/any-pass/any-pass.js');
const aperture = require('./modules/aperture/aperture.js');
const applySpec = require('./modules/apply-spec/apply-spec.js');
const applyTo = require('./modules/apply-to/apply-to.js');
const assoc = require('./modules/assoc/assoc.js');
const assocPath = require('./modules/assoc-path/assoc-path.js');

const bisectSearch = require('./modules/bisect-search/bisect-search.js');
const bubbleSort = require('./modules/bubble-sort/bubble-sort.js');
const bubbleSortBy = require('./modules/bubble-sort-by/bubble-sort-by.js');
const buildTrie = require('./modules/build-trie/build-trie.js');

const cocktailSort = require('./modules/cocktail-sort/cocktail-sort.js');
const compose = require('./modules/compose/compose.js');
const composeP = require('./modules/compose-p/compose-p.js');
const concat = require('./modules/concat/concat.js');
const construct = require('./modules/construct/construct.js');
const converge = require('./modules/converge/converge.js');
const countBy = require('./modules/count-by/count-by.js');
const countSort = require('./modules/count-sort/count-sort.js');
const createStore = require('./modules/create-store/create-store.js');
const curry = require('./modules/curry/curry.js');
const cycleSort = require('./modules/cycle-sort/cycle-sort.js');

const deepClone = require('./modules/deep-clone/deep-clone.js');
const deepFlat = require('./modules/deep-flat/deep-flat.js');
const deepFreeze = require('./modules/deep-freeze/deep-freeze.js');
const defaultTo = require('./modules/default-to/default-to.js');
const dijkstraShortestPath = require('./modules/dijkstra-shortest-path/dijkstra-shortest-path.js');
const dissoc = require('./modules/dissoc/dissoc.js');
const drop = require('./modules/drop/drop.js');
const dropRepeatsWith = require('./modules/drop-repeats-with/drop-repeats-with.js');

const eqBy = require('./modules/eq-by/eq-by.js');
const equals = require('./modules/equals/equals.js');
const every = require('./modules/every/every.js');

const fill = require('./modules/fill/fill.js');
const filter = require('./modules/filter/filter.js');
const find = require('./modules/find/find.js');
const forEach = require('./modules/for-each/for-each.js');

const groupBy = require('./modules/group-by/group-by.js');

const includes = require('./modules/includes/includes.js');
const innerJoin = require('./modules/inner-join/inner-join.js');
const insertionSort = require('./modules/insertion-sort/insertion-sort.js');
const intersection = require('./modules/intersection/intersection.js');
const intersperse = require('./modules/intersperse/intersperse.js');
const invoker = require('./modules/invoker/invoker.js');

const juxt = require('./modules/juxt/juxt.js');

const length = require('./modules/length/length.js');
const levenshteinDistance = require('./modules/levenshtein-distance/levenshtein-distance.js');
const linkedListForEach = require('./modules/linked-list-for-each/linked-list-for-each.js');
const linkedListFromArray = require('./modules/linked-list-from-array/linked-list-from-array.js');
const linkedListToArray = require('./modules/linked-list-to-array/linked-list-to-array.js');

const map = require('./modules/map/map.js');
const mapObjIndexed = require('./modules/map-obj-indexed/map-obj-indexed.js');
const memoize = require('./modules/memoize/memoize.js');
const merge = require('./modules/merge/merge.js');
const mergeLists = require('./modules/merge-lists/merge-lists.js');
const mergeSort = require('./modules/merge-sort/merge-sort.js');
const mergeWith = require('./modules/merge-with/merge-with.js');
const monkeySort = require('./modules/monkey-sort/monkey-sort.js');

const nAry = require('./modules/n-ary/n-ary.js');
const omit = require('./modules/omit/omit.js');
const objectEntries = require('./modules/object-entries/object-entries.js');
const objectValues = require('./modules/object-values/object-values.js');

const partition = require('./modules/partition/partition.js');
const path = require('./modules/path/path.js');
const pathOr = require('./modules/path-or/path-or.js');
const pathSatisfies = require('./modules/path-satisfies/path-satisfies.js');
const pick = require('./modules/pick/pick.js');
const pluck = require('./modules/pluck/pluck.js');
const project = require('./modules/project/project.js');

const quickSort = require('./modules/quick-sort/quick-sort.js');
const quickSortBy = require('./modules/quick-sort-by/quick-sort-by.js');
const quickSortWith = require('./modules/quick-sort-with/quick-sort-with.js');

const radixSort = require('./modules/radix-sort/radix-sort.js');
const range = require('./modules/range/range.js');
const reduce = require('./modules/reduce/reduce.js');
const reduceWhile = require('./modules/reduce-while/reduce-while.js');
const reverse = require('./modules/reverse/reverse.js');

const selectionSort = require('./modules/selection-sort/selection-sort.js');
const some = require('./modules/some/some.js');
const splitEvery = require('./modules/split-every/split-every.js');
const splitWhen = require('./modules/split-when/split-when.js');
const strPaddEnd = require('./modules/str-pad-end/str-pad-end.js');
const strPaddStart = require('./modules/str-pad-start/str-pad-start.js');
const symetricDifference = require('./modules/symetric-difference/symetric-difference.js');

const take = require('./modules/take/take.js');
const takeWhile = require('./modules/take-while/take-while.js');
const tap = require('./modules/tap/tap.js');
const timSort = require('./modules/tim-sort/tim-sort.js');
const trampoline = require('./modules/trampoline/trampoline.js');
const transduce = require('./modules/transduce/transduce.js');
const transpose = require('./modules/transpose/transpose.js');
const traverseTree = require('./modules/traverse-tree/traverse-tree.js');


const uncurryN = require('./modules/uncurry-n/uncurry-n.js');
const uniqueBy = require('./modules/unique-by/unique-by.js');
const unfold = require('./modules/unfold/unfold.js');
const union = require('./modules/union/union.js');
const unless = require('./modules/unless/unless.js');
const until = require('./modules/until/until.js');
const whyBird = require('./modules/why-bird/why-bird.js');

const xprod = require('./modules/xprod/xprod.js');

const Ycombinator = require('./modules/y-combinator/y-combinator.js');

const zip = require('./modules/zip/zip.js');
const zipObj = require('./modules/zip-obj/zip-obj.js');

const RecursiveJS = [
  adjust, allAnagrams, allPass, allPermutations, anyPass, aperture, applySpec, applyTo, assoc, assocPath,
  bubbleSort, bisectSearch, buildTrie,
  cocktailSort, compose, composeP, concat, construct, converge, countBy, countSort, createStore, curry, cycleSort,
  deepClone, deepFlat, deepFreeze, defaultTo, dijkstraShortestPath, dissoc, drop, dropRepeatsWith,
  eqBy, equals, every,
  fill, filter, find, forEach,
  groupBy,
  includes, innerJoin, insertionSort, intersection, intersperse, invoker,
  juxt,
  length, levenshteinDistance, linkedListForEach, linkedListFromArray, linkedListToArray,
  map, mapObjIndexed, memoize, merge, mergeSort, mergeWith, monkeySort,
  nAry,
  objectEntries, objectValues, omit,
  partition, path, pathOr, pathSatisfies, pick, pluck, project,
  quickSort,
  radixSort, range, reduce, reduceWhile, reverse,
  selectionSort, some, quickSortWith, splitEvery, splitWhen, strPaddEnd, strPaddStart, symetricDifference,
  take, takeWhile, tap, timSort, trampoline, transduce, transpose, traverseTree,
  uncurryN, unfold, union, uniqueBy, unless, until,
  whyBird,
  Ycombinator,
  xprod,
  zip, zipObj
];

module.exports = reduce((acc, fn) => {
  if(fn.length > 1 && fn.name !== 'equals') acc[fn.name] = curry(fn);
  else acc[fn.name] = fn;
  return acc;
}, RecursiveJS, {});
