const compose = require('../compose/compose.js');
const curry = require('../curry/curry.js');
const map = require('../map/map.js');
const objectEntries = require('../object-entries/object-entries.js');
const length = require('../length/length.js');
const forEach = require('../for-each/for-each.js');
const reduce = require('../reduce/reduce.js');

// objectKeys :: Object -> [String]
const objectKeys = compose(curry(map)(([key]) => key), objectEntries);

function floydWarshall(graph) {
  const vertices = objectKeys(graph);
  const keys = reduce((acc, val) => { acc[val] = Infinity; return acc }, vertices, {});
  const paths = {};

  forEach(vertice => { paths[vertice] = {...keys, ...graph[vertice], [vertice]: 0 }; }, vertices);

  forEach((_, it1) => {
    forEach((_, it2) => {
      forEach((_, it3) => {
        paths[vertices[it2]][vertices[it3]] = (
            Math.min(
                paths[vertices[it2]][vertices[it3]],
                paths[vertices[it2]][vertices[it1]] + paths[vertices[it1]][vertices[it3]]
            )
        );
      }, vertices);
    }, vertices);
  }, vertices);

  return paths;
}

module.exports = floydWarshall;
