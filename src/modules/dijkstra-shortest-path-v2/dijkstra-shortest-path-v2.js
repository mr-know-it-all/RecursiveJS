const length = require('../length/length.js');

// Queue :: () -> Object
function Queue() {
  this.elements = [];

  // isEmpty :: () -> Boolean
  this.isEmpty = () => !length(this.elements);
  // put :: (String, Int) -> ()
  this.put = (element, priority) => {
    this.elements[0] && this.elements[0].priority > priority
      ? this.elements = [{element, priority}, ...this.elements]
      : this.elements = [...this.elements, {element, priority}];
  }
  // get :: () -> String
  this.get = () => {
    let [{element}, ...elements] = this.elements;
    this.elements = elements;
    return element;
  }
}

// getPath :: (Object, String, String) -> [String]
function getPath(cameFrom, start, goal) {
  return (function getPath(current, path) {
    return current === start
      ? [start, ...path]
      : getPath(cameFrom[current], [current, ...path]);
  })(goal, []);
}

// dijkstraShortestPathV2 :: (Object, String, String) -> [String]
function dijkstraShortestPathV2(graph, start, goal) {
  const frontier = new Queue();
  const cameFrom = {};
  const costSoFar = {};

  frontier.put(start);
  cameFrom[start] = start;
  costSoFar[start] = 0;

  (function whileFrontierIsNotEmpty() {
    const current = frontier.get();
    if(current === goal) return;

    const neighbors = graph.getNeighbors(current);

    (function forEachNeighbor([neighbor, ...neighbors]) {
      if(neighbor === undefined) return;

      const newCost = costSoFar[current] + graph.cost(current, neighbor);
      if(!costSoFar[neighbor] || newCost < costSoFar[neighbor]) {
        costSoFar[neighbor] = newCost;
        const priority = newCost;
        frontier.put(neighbor, priority);
        cameFrom[neighbor] = current;
      }

      forEachNeighbor(neighbors);
    })(neighbors);

    !frontier.isEmpty() && whileFrontierIsNotEmpty();
  })();

  return getPath(cameFrom, start, goal);
}

module.exports = dijkstraShortestPathV2;
