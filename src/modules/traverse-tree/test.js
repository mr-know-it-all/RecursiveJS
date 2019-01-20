const traverseTree = require('./traverse-tree.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function traverseTree_test() {
  class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  const buildNode = (data, left = null, right = null) => new Node(data, left, right);
  const TreeOne =
    buildNode(
      1,
      buildNode(
        2,
        buildNode(
          21,
          buildNode(22),
          buildNode(
            32,
            buildNode(
              321,
              buildNode(322),
              buildNode(323)
            )
          )
        )
      ),
      buildNode(
        3,
        buildNode(
          31,
          buildNode(32),
          buildNode(33)
        )
      )
    );

  compose(
    () => expect(
      'traverseTree postOrder',
      [22, 322, 323, 321, 32, 21, 2, 32, 33, 31, 3, 1],
      traverseTree('postOrder', TreeOne)
    ),
    () => expect(
      'traverseTree inOrder',
      [22, 21, 322, 321, 323, 32, 2, 1, 32, 31, 33, 3],
      traverseTree('inOrder', TreeOne)
    ),
    () => expect(
      'traverseTree preOrder',
      [1, 2, 21, 22, 32, 321, 322, 323, 3, 31, 32, 33],
      traverseTree('preOrder', TreeOne)
    )
  )();
}

module.exports = traverseTree_test;
