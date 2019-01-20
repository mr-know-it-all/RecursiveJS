const aStar = require('./a-star.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function aStar_test() {
  // SquareGrid :: Object -> Object
  function SquareGrid({width = 10, height = 10, walls = []}) {
    this.width = width;
    this.height = height;
    this.walls = walls;
    this.weights = {};

    // inBounds :: String -> Boolean
    this.inBounds = id => {
      const [x, y] = id.split('#');

      return (
        0 <= x && x < this.width &&
        0 <= y && y < this.height
      );
    }

    // passable :: String -> Boolean
    this.passable = id => !this.walls.includes(id);

    // getNeighbors :: String -> [Strings]
    this.getNeighbors = id => {
      const [x, y] = id.split('#');
      const neighbors = [
        `${x}#${Number(y) - 1}`,
        `${Number(x) + 1}#${y}`,
        `${x}#${Number(y) + 1}`,
        `${Number(x) - 1}#${y}`
      ];

      return neighbors.filter(x => this.inBounds(x) && this.passable(x));
    }

    // cost :: (String, String) -> Int
    this.cost = (from, to) => {
      // standard cost for grid
      return 1;
    }
  }

  compose(
    () => {
      const myGrid = new SquareGrid({width: 15, height: 15, walls: ['10#0', '12#1']});
      const [start, goal] = ['5#0', '12#2'];
      const aStarPath = aStar(myGrid, start, goal);  const aStarExpectedPath = ['5#0', '5#1', '5#2', '6#2', '7#2', '8#2', '9#2', '10#2', '11#2', '12#2'];

      expect('aStar', aStarExpectedPath, aStarPath);
    },
    () => {
      const myGrid = new SquareGrid({width: 15, height: 15, walls: ['4#1', '4#0',  '3#1', '3#0', '2#0', '2#2', '1#0', '1#1']});
      const [start, goal] = ['0#0', '4#2'];
      const aStarPath = aStar(myGrid, start, goal);
      const expectedPath = ['0#0', '0#1', '0#2', '1#2', '1#3', '2#3', '3#3', '3#2', '4#2'];

      expect('aStar', expectedPath, aStarPath);
    }
  )();
}

module.exports = aStar_test;
