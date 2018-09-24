const length = require('../length/length.js');
const objectEntries = require('../object-entries/object-entries.js');
const compose = require('../compose/compose.js');
const reduce = require('../reduce/reduce.js');
const reverse = require('../reverse/reverse.js');

// dijkstraShortestPath :: Object -> [String]
function dijkstraShortestPath(graph) {
  const buildPathsTable = graph => reduce((acc, [key, _]) => (
    (acc[key] = {
      distToStart: key === 'start' ? 0 : Infinity,
      through: key === 'start' ? 'start' : null,
      visited: false
    }), acc
  ), objectEntries(graph), {});

  const getShortestUnvisitedKey = Table => reduce((acc, v) => (
    !v[1].visited && (acc === 'ALL_VISITED' || v[1].distToStart < acc[1].distToStart) ? v : acc
  ), objectEntries(Table), 'ALL_VISITED');

  const updateShortestPathsTable = Table => {
    let nextKey = getShortestUnvisitedKey(Table);
    if(nextKey === 'ALL_VISITED') return Table;

    (function updateDistanceToStart([key, ...xs]) {
      if(key === undefined) return;
      if(key[1] + Table[nextKey[0]].distToStart < Table[key[0]].distToStart) {
        Table[key[0]].distToStart = key[1] + Table[nextKey[0]].distToStart;
        Table[key[0]].through = nextKey[0];
      }
      return updateDistanceToStart(xs);
    })(objectEntries(graph[nextKey[0]]));
    Table[nextKey[0]].visited = true;

    return updateShortestPathsTable(Table);
  };

  const computeFinishToStartPath = Table => function compute(path = []) {
    if(path[length(path) - 1] === 'start') return path;
    else if(length(path) === 0) return compute(['finish', Table['finish'].through]);
    else return compute([...path, Table[path[length(path) - 1]].through])
  };

  return compose(
    finishToStartPath => reverse(finishToStartPath),
    updatedTable => computeFinishToStartPath(updatedTable)(),
    Table => updateShortestPathsTable(Table),
    () => buildPathsTable(graph)
  )();
}

module.exports = dijkstraShortestPath;