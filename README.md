RecursiveJS - an educational library

The functions implemented here are naive implementations that serve absolutely no use in production code. Even more, JavaScript doesn't have yet TCO available in all major browsers, so a recursive looping approach is not scalable. This library is not meant to be used, but to be read and tried out. It shows how beautiful and powerful recursion is, and how good is JavaScript at showing that.

Almost every looping mechanism implemented here is either self recursive or it uses another function from the same library. Spread is used for pattern matching or array destructuring. Also, we get the function's arity with function.prototype.length etc.

How to use: Clone the repo and run the recursiveJS_test.js file with the latest version of node or import the src file (src/recursive.js) in your project. At this point, the tests are the only available documentation.

You'll find implementations of built in methods (like map, filter, reduce), standard utils library methods (like curry, compose, deepClone), a selection of sorting algorithms, path finding algorithms, tree traversal and more. See the full list of modules below.

Enjoy!

List of modules:

- TSP - [Travelling salesman problem] (https://en.wikipedia.org/wiki/Travelling_salesman_problem)
- a-star - [A* search algorithm] (https://en.wikipedia.org/wiki/A*_search_algorithm)
- adjust (https://ramdajs.com/docs/#adjust)
- all-anagrams - finds all character permutations in a given string
- all-pass (https://ramdajs.com/docs/#allPass)
- all-permutations - finds all permutations of a given array
- any-pass (https://ramdajs.com/docs/#anyPass)
- aperture (https://ramdajs.com/docs/#aperture)
- apply-spec (https://ramdajs.com/docs/#applySpec)
- apply-to (https://ramdajs.com/docs/#applyTo)
- assoc-path (https://ramdajs.com/docs/#assocPath)
- assoc (https://ramdajs.com/docs/#assoc)
- bisect-search - [Binary Search algorithm] (https://en.wikipedia.org/wiki/Binary_search_algorithm)
- bubble-sort-by - bubble sort with custom compare function
- bubble-sort (https://en.wikipedia.org/wiki/Bubble_sort)
- build-trie - utility for building a trie (https://en.wikipedia.org/wiki/Trie)
- cocktail-sort - [Cocktail shaker sort] (https://en.wikipedia.org/wiki/Cocktail_shaker_sort)
- compose-p - promise composition utility
- compose - simple function composition utility
- concat - standard concat utility
- construct (https://ramdajs.com/docs/#construct)
- converge (https://ramdajs.com/docs/#converge)
- count-by (https://ramdajs.com/docs/#countBy)
- count-sort - [Counting sort algorithm] (https://en.wikipedia.org/wiki/Counting_sort)
- create-store - naive implementation of a redux-like store
- curry - utility for currying
- cycle-sort - [Cycle sort algorithm] (https://en.wikipedia.org/wiki/Cycle_sort)
- deep-clone - utility for deep cloning 
- deep-flat - flattens arrays with any level of nesting
- deep-freeze - implements Object.freeze in depth
- default-to (https://ramdajs.com/docs/#defaultTo)
- dijkstra-shortest-path, dijkstra-shortest-path-v2 - [Dijkstra's algorithm] (https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- dissoc (https://ramdajs.com/docs/#dissoc)
- drop-repeats-with (https://ramdajs.com/docs/#dropRepeatsWith)
- drop (https://ramdajs.com/docs/#drop)
- eq-by (https://ramdajs.com/docs/#eqBy)
- equals (https://ramdajs.com/docs/#equals)
- every - implementation of the standard Array.prototype method
- evolve (https://ramdajs.com/docs/#evolve)
- fill - creates an array filled with n specified elements
- filter - implementation of the standard Array.prototype method
- find - implementation of the standard Array.prototype method
- for-each - implementation of the standard Array.prototype method
- gnome-sort - [Gnome sort algorithm] (https://en.wikipedia.org/wiki/Gnome_sort)
- group-by (https://ramdajs.com/docs/#groupBy)
- group-with (https://ramdajs.com/docs/#groupWith)
- heap-sort - [Heapsort algorithm] (https://en.wikipedia.org/wiki/Heapsort)
- includes (https://ramdajs.com/docs/#includes)
- inner-join (https://ramdajs.com/docs/#innerJoin)
- insertion-sort - [Insertion sort algorithm] (https://en.wikipedia.org/wiki/Insertion_sort)
- intersection (https://ramdajs.com/docs/#intersection)
- intersperse (https://ramdajs.com/docs/#intersperse)
- invoker (https://ramdajs.com/docs/#invoker)
- juxt (https://ramdajs.com/docs/#juxt)
- length - implementation of the standard Array.prototype method
- levenshtein-distance - [Levenshtein distance algorithm] (https://en.wikipedia.org/wiki/Levenshtein_distance)
- linked-list-for-each - iterates through a linked list
- linked-list-from-array - creates a linked list from an array
- linked-list-to-array - creates an array from a linked list
- map-obj-indexed (https://ramdajs.com/docs/#mapObjIndexed)
- map - implementation of the standard Array.prototype method
- memoize - utility for memoizing
- merge-lists - list merge function used in merge-sort
- merge-sort - [Merge sort algorithm] (https://ro.wikipedia.org/wiki/Merge_sort)
- merge-with (https://ramdajs.com/docs/#mergeWith)
- merge - utility that merges two objects
- monkey-sort - [Bogosort algorithm] (https://en.wikipedia.org/wiki/Bogosort)
- n-ary (https://ramdajs.com/docs/#nAry)
- n-permutations - builds a list of n permutations of items in a given array
- object-entries - implementation of Object.entries
- object-values - implementation of Object.values
- omit (https://ramdajs.com/docs/#omit)
- partition (https://ramdajs.com/docs/#partition)
- path-or (https://ramdajs.com/docs/#pathOr)
- path-satisfies (https://ramdajs.com/docs/#pathSatisfies)
- path (https://ramdajs.com/docs/#path)
- pick (https://ramdajs.com/docs/#pick)
- pluck (https://ramdajs.com/docs/#pluck)
- project (https://ramdajs.com/docs/#project)
- quick-sort-by - quick sort algorithm with custom predicate
- quick-sort-with - quick sort with custom comparator function
- quick-sort - [Quick sort algorithm] (https://ro.wikipedia.org/wiki/Quicksort)
- radix-sort - [Radix sort algorithm] (https://en.wikipedia.org/wiki/Radix_sort)
- range (https://ramdajs.com/docs/#range)
- reduce-while (https://ramdajs.com/docs/#reduceWhile)
- reduce - implementation of the standard Array.prototype method
- reverse - implementation of the standard Array.prototype method
- rotate-matrix - matrix rotation utility
- selection-sort - [Selection sort algorithm] (https://en.wikipedia.org/wiki/Selection_sort)
- some  - implementation of the standard Array.prototype method
- split-every (https://ramdajs.com/docs/#splitEvery)
- split-when (https://ramdajs.com/docs/#splitWhen)
- str-pad-end - adds padding to the end of a given string
- str-pad-start - adds padding to the start of a given string
- swap - swaps two array elements
- symetric-difference (https://ramdajs.com/docs/#symmetricDifference)
- take-while (https://ramdajs.com/docs/#takeWhile)
- take (https://ramdajs.com/docs/#take)
- tap (https://ramdajs.com/docs/#tap)
- tim-sort - [Timsort algorithm] (https://en.wikipedia.org/wiki/Timsort)
- trampoline - trampoline utility
- transduce (https://ramdajs.com/docs/#transduce) 
- transpose - transposes a given array of arrays
- traverse-tree - tree traversal utility
- uncurry-n (https://ramdajs.com/docs/#uncurryN)
- unfold (https://ramdajs.com/docs/#unfold)
- union (https://ramdajs.com/docs/#union)
- unique-by (https://ramdajs.com/docs/#uniqBy)
- unless (https://ramdajs.com/docs/#unless)
- until (https://ramdajs.com/docs/#until)
- why-bird - [a variation on the Y combinator] (https://en.wikipedia.org/wiki/Fixed-point_combinator#Fixed_point_combinators_in_lambda_calculus)
- xprod (https://ramdajs.com/docs/#xprod)
- y-combinator - [the famous Y combinator] (https://en.wikipedia.org/wiki/Fixed-point_combinator#Fixed_point_combinators_in_lambda_calculus)
- zip-obj (https://ramdajs.com/docs/#zipObj)
- zip (https://ramdajs.com/docs/#zip)
