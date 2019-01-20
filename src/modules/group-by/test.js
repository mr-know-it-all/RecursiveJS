const groupBy = require('./group-by.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function groupBy_test() {
  const getExp = ({points}) => points > 1000 ? 'master' : points > 500 ? 'craftsman' : 'novice';
  const getAgeGroup = ({age}) => age > 80 ? 'senior' : age > 60 ? 'old' : 'young';
  const players = [
    {name: 'Joe', points: 100, age: 34},
    {name: 'John', points: 1001, age: 24},
    {name: 'Jack', points: 501, age: 32},
    {name: 'Jill', points: 700, age: 44},
    {name: 'Jane', points: 1002, age: 67},
    {name: 'Jacob', points: 99, age: 100}
  ];

  compose(
    () => expect(
      'groupBy test 2',
      {
        young: [
          {name: 'Joe', points: 100, age: 34},
          {name: 'John', points: 1001, age: 24},
          {name: 'Jack', points: 501, age: 32},
          {name: 'Jill', points: 700, age: 44}
        ],
        old: [{name: 'Jane', points: 1002, age: 67}],
        senior: [{name: 'Jacob', points: 99, age: 100}]
      },
      groupBy(getAgeGroup, players)
    ),
    () => expect(
      'groupBy test 1',
      {
        novice: [{name: 'Joe', points: 100, age: 34}, {name: 'Jacob', points: 99, age: 100}],
        master: [{name: 'John', points: 1001, age: 24}, {name: 'Jane', points: 1002, age: 67}],
        craftsman: [{name: 'Jack', points: 501, age: 32}, {name: 'Jill', points: 700, age: 44}]
      },
      groupBy(getExp, players)
    )
  )();

}

module.exports = groupBy_test;
