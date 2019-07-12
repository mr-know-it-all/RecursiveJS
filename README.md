An educational library

The functions implemented here are naive implementations that serve absolutely no use in production code. Even more, JavaScript doesn't have yet TCO available in all major browsers, so a recursive looping approach is not scalable. This library is not meant to be used, but to be read and tried out. It shows how beautiful and powerful recursion is, and how good is JavaScript at showing that.

Almost every looping mechanism implemented here is either self recursive or it uses another function from the same library. Spread is used for pattern matching or array destructuring. Also, we get the function's arity with function.prototype.length etc.

How to use: Clone the repo and run the recursiveJS_test.js file with the latest version of node or import the src file (src/recursive.js) in your project. At this point, the tests are the only available documentation.

You'll find implmentations of built in methods (like map, filter, reduce), standard utils library methods (like curry, compose, deepClone), a selection of sorting algorithms, path finding algorithms, tree traversal and more. See the full list of modules below.

Enjoy!


List of modules:

TSP (Travelling salesman problem)
a-star
adjust
all-anagrams
all-pass
all-permutations
any-pass
aperture
apply-spec
apply-to
assoc-path
assoc
bisect-search
bubble-sort-by
bubble-sort
build-trie
cocktail-sort
compose-p
compose
concat
construct
converge
count-by
count-sort
create-store
curry
cycle-sort
deep-clone
deep-flat
deep-freeze
default-to
dijkstra-shortest-path-v2
dijkstra-shortest-path
dissoc
drop-repeats-with
drop
eq-by
equals
every
evolve
fill
filter
find
for-each
gnome-sort
group-by
group-with
heap-sort
includes
inner-join
insertion-sort
intersection
intersperse
invoker
juxt
length
levenshtein-distance
linked-list-for-each
linked-list-from-array
linked-list-to-array
map-obj-indexed
map
memoize
merge-lists
merge-sort
merge-with
merge
monkey-sort
n-ary
n-permutations
object-entries
object-values
omit
partition
path-or
path-satisfies
path
pick
pluck
project
quick-sort-by
quick-sort-with
quick-sort
radix-sort
range
reduce-while
reduce
reverse
rotate-matrix
selection-sort
some
split-every
split-when
str-pad-end
str-pad-start
swap
symetric-difference
take-while
take
tap
tim-sort
trampoline
transduce
transpose
traverse-tree
uncurry-n
unfold
union
unique-by
unless
until
why-bird
xprod
y-combinator
zip-obj
zip
