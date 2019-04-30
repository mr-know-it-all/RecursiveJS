const find = require('../find/find.js');
const filter = require('../filter/filter.js');
const map = require('../map/map.js');
const compose = require('../compose/compose.js');
const curry = require('../curry/curry.js');
const forEach = require('../for-each/for-each.js');
const objectEntries = require('../object-entries/object-entries.js');
const take = require('../take/take.js');
const drop = require('../drop/drop.js');

// objectKeys :: Object -> [String]
const objectKeys = compose(curry(map)(([key]) => key), objectEntries);

// tsp :: (Object, String) -> [String]
function tsp(graph, s) {
  const nodes = objectKeys(graph);
  const start = find(n => n === s, nodes);
  const rest = filter(n => n !== s, nodes);
  const bestRoute = { route: [], cost: Infinity };

  // findCost :: ([String], Object, Boolean) -> Int
  const findCost = (path, graph, intermediate = false) => {
    return (function computeCost(index = 0) {
      const from = path[index];
      const to = path[index + 1] || (intermediate ? from : path[0]);

      return from === to ? 0 : graph[from][to] + computeCost(index + 1);
    })()
  };

  // findBestRoute :: ([String], [String]) -> [String]
  (function findBestRoute(list, permutation = []) {
    if(list.length === 0) {
      const currentCost = findCost([start, ...permutation, start], graph);

      currentCost < bestRoute.cost && (
        (bestRoute.route = permutation) &&
        (bestRoute.cost = currentCost)
      );

      return;
    }

    forEach((elem, index) => {
      const listMinusElem = [...take(index, list), ...drop(index + 1, list)];
      const permutationPlusElem = [...permutation, elem];
      const intermediateCost = findCost([start, ...permutationPlusElem], graph, true);

      intermediateCost < bestRoute.cost && findBestRoute(listMinusElem, permutationPlusElem);
    }, list);
  })(rest);

  return [start, ...bestRoute.route, start];
}

module.exports = tsp;
