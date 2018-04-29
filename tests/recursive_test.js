'use strict';

const {
  reverse,
  forEach,
  length,
  reduce,
  map,
  curry,
  compose,
  filter,
  some,
  every,
  find,
  fill,
  quickSort,
  take,
  takeWhile,
  composeP,
  innerJoin,
  intersection,
  uniqueBy,
  juxt,
  project,
  zip,
  memoize,
  allPass,
  merge,
  symmetricDifference,
  reduceWhile,
  pluck,
  pick,
  omit,
  uncurryN,
  path,
  partition,
  concat,
  mergeWith,
  pathOr,
  pathSatisfies,
  unless,
  until,
  xprod,
  zipObj,
  deepFlat
} = require('./../src/recursive.js');

const testsState = {
  allTests: 0,
  passedTests: 0,
  failedTests: 0,
  resetAll: function() {
    this.allTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
  },
  testPassed: function() {
    this.allTests = this.allTests + 1;
    this.passedTests = this.passedTests + 1;
  },
  testFailed: function() {
    this.allTests = this.allTests + 1;
    this.failedTests = this.failedTests + 1;
  }
};

runTests(testsState).catch(err => {
  console.error('>>>', err);
  logTestsStatus(testsState);
});

async function runTests() {
  testsState.resetAll();

  // reverse test
  expect('reverse', [3, 2, 1], reverse([1, 2, 3]));

  // forEach test
  let arrayForEach = [1, 2, 3];
  forEach((x, index) => x * 2, arrayForEach);
  expect("forEach", [2, 4, 6], arrayForEach);

  // length test
  let arrayLength = [1, 2, 3, 4, 5];
  expect('length', 5, length(arrayLength));

  // reduce test
  let arrayReduce = [1, 2, 3, 4, 5];
  expect('reduce', 15, reduce((acc, v) => acc + v, arrayReduce, 0));

  // map test
  let mapArray = [1, 2, 3, 4];
  expect('map', [1, 2, 3, 4], mapArray);
  expect('map', [2, 3, 4, 5], map(x => x + 1, mapArray));

  // curry test
  let curryFunction = function(a, b, c, d) {
    return a + b + c + d;
  };

  expect('curry', curryFunction(1, 2, 3, 4), curry(curryFunction)(1)(2, 3)(4));

  // compose test
  const addOne = x => x + 1;
  const multiplyByTwo = x => x * 2;

  expect('compose', multiplyByTwo(addOne(5)), compose(multiplyByTwo, addOne)(5));

  // filter test
  let filterArray = [1, 2, 3, 4, 5, 6];
  expect('filter', [2, 4, 6], filter(x => x % 2 === 0, filterArray));

  // some test
  let someArrayTrue = [false, false, false, true];
  let someArrayFalse = [false, false, false, false];

  expect('some', true, some(x => x === true, someArrayTrue));
  expect('some', false, some(x => x === true, someArrayFalse));

  // every test
  let everyArrayTrue = [false, false, false, true];
  let everyArrayFalse = [false, false, false, false, false];

  expect('every', false, every(x => x !== true, everyArrayTrue));
  expect('every', true, every(x => x !== true, everyArrayFalse));

  // find test
  let findArray = [1, 2, 3, 4];

  expect('find', 4, find(x => x === 4, findArray));
  expect('find', false, find(x => x === 42, findArray));

  // fill test
  let fillArray = [1, 1, 1, 1, 1, 1];
  let fillArrayObjects = [{
    a: 1
  }, {
    a: 1
  }, {
    a: 1
  }, {
    a: 1
  }, {
    a: 1
  }];

  expect('fill', fillArray, fill(1, 6));
  expect('fill', fillArrayObjects, fill({
    a: 1
  }, 5));

  // quickSort test
  let quickSortArray = [7, 2, 1, 3, 5, 4, 6, 9, 8];

  expect('quickSort', [1, 2, 3, 4, 5, 6, 7, 8, 9], quickSort(quickSortArray));

  // take test
  let takeArray = [1, 2, 3, 4, 5, 6, 7];

  expect('take', [1, 2, 3], take(3, takeArray));

  // takeWhile test
  let takeWhileArray = [1, 2, 3, 4, 5, 6, 7];

  expect('takeWhile', [1, 2, 3, 4, 5], takeWhile(x => x <= 5, takeWhileArray));

  // composeP test
  const getUserName = () => new Promise(resolve => setTimeout(() => resolve('John'), 500));
  const getUserAge = userName => new Promise(resolve => setTimeout(() => resolve(`${userName} 42`), 500));
  const getUserCity = userNameAndAge => new Promise(resolve => setTimeout(() => resolve(`${userNameAndAge} NY`), 500));

  await composeP(getUserCity, getUserAge, getUserName)().then(composeP => {
    expect('composeP', 'John 42 NY', composeP);
  });

  // innerJoin test - inspired by Ramda
  let innerJoinResult = innerJoin(
    (user, id) => user.id === id, [{
      id: 1,
      name: 'User One'
    }, {
      id: 2,
      name: 'User Two'
    }, {
      id: 3,
      name: 'User Three'
    }, {
      id: 4,
      name: 'User Four'
    }, {
      id: 5,
      name: 'User Five'
    }], [1, 3, 5]
  );

  expect('innerJoin', [{
    id: 1,
    name: 'User One'
  }, {
    id: 3,
    name: 'User Three'
  }, {
    id: 5,
    name: 'User Five'
  }], innerJoinResult);

  // intersection test
  expect('intersection', [3, 4], intersection([4, 3, 1, 2, 3, 4, 3, 3], [7, 6, 5, 4, 3, 3]));

  // uniqueBy test
  expect('uniqueBy', [1, 2, 3], uniqueBy(x => x, [1, 2, 1, 2, 3, 3, 3, 1]));
  expect(
    'unique', [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }],
    uniqueBy(({
      id
    }) => id, [{
      id: 1
    }, {
      id: 1
    }, {
      id: 2
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 3
    }])
  );

  // juxt test
  expect('juxt', [1, 9], juxt([Math.min, Math.max], [9, 1, 3, 1, 2, 3, 4, 5, 6]));

  // memoize test
  let callCount = 0;
  let memoizeList = [
    [4, 2],
    [5, 1],
    [4, 2],
    [5, 1],
    [4, 2],
    [5, 1]
  ];
  const adder = (x, y) => (callCount++, x + y);
  const memoizedAdder = memoize(adder);

  map(([x, y]) => {
    memoizedAdder(x, y);
  }, memoizeList);

  expect(
    'memoize',
    callCount,
    compose(length, () => uniqueBy(([x, y]) => `${x}${y}`, memoizeList))()
  );

  let people = [{
    name: 'John',
    age: 30,
    city: 'NY',
    country: 'US'
  }, {
    name: 'Joe',
    age: 31,
    city: 'WS',
    country: 'US'
  }, {
    name: 'Jack',
    age: 32,
    city: 'WS',
    country: 'RO'
  }];

  expect(
    'project', [{
      name: 'John',
      age: 30
    }, {
      name: 'Joe',
      age: 31
    }, {
      name: 'Jack',
      age: 32
    }],
    project(['name', 'age'], people)
  );

  // allPass test
  const isEven = x => x % 2 === 0;
  const largerThanTwo = x => x > 2;
  const isInteger = x => Number.isInteger(x);

  expect('allPass', true, allPass(
    [isEven, largerThanTwo, isInteger], [4, 6, 8, 10]
  ));

  expect('allPass', false, allPass(
    [isEven, largerThanTwo, isInteger], [4, 6, 8, 10, 'a']
  ));

  // zip test
  expect(
    'zip', [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ],
    zip([1, 2, 3], ['a', 'b', 'c', 'd', 'e'])
  );

  // merge test
  expect(
    'merge', {
      age: '27',
      city: 'NY',
      alias: 'aka',
      name: 'John'
    },
    merge({
      age: '21',
      alias: 'aka',
      city: 'WS',
      name: 'John'
    }, {
      age: '27',
      city: 'NY'
    })
  );

  // omit test
  expect(
    'omit', {
      alias: 'aka',
      name: 'John'
    },
    omit(
      ['age', 'city'], {
        age: '21',
        alias: 'aka',
        city: 'WS',
        name: 'John'
      }
    )
  );

  // pick test
  expect(
    'pick', {
      age: '21',
      city: 'WS'
    },
    pick(
      ['age', 'city'], {
        age: '21',
        alias: 'aka',
        city: 'WS',
        name: 'John'
      }
    )
  );

  // pluck test
  expect(
    'pluck', ['21', '22', '23'],
    pluck(
      'age', [{
        age: '21',
        alias: 'aka1',
        city: 'WS1',
        name: 'John1'
      }, {
        age: '22',
        alias: 'aka2',
        city: 'WS2',
        name: 'John2'
      }, {
        age: '23',
        alias: 'aka3',
        city: 'WS3',
        name: 'John3'
      }]
    )
  );

  // pluck test
  expect(
    'pluck', [1, 2, 3, 4],
    pluck(0, [
      [1, 42],
      [2, 42],
      [3, 42],
      [4, 42]
    ])
  );

  // reduceWhile test
  const add = (x, y) => x + y;
  const reduceWhileList1 = [5, 4, 3, 2, 1];
  expect(
    'reduceWhile',
    12,
    reduceWhile(largerThanTwo, add, reduceWhileList1, 0)
  );

  // reduceWhile test
  const reduceWhileList2 = [1, 2, 3, 4, 5, 'six', 7, 8];
  expect(
    'reduceWhile',
    15,
    reduceWhile(isInteger, add, reduceWhileList2, 0)
  );

  // symmetricDifference test
  expect(
    'symmetricDifference', [1, 2, 7, 6, 5, 42],
    symmetricDifference([1, 2, 3, 4], [7, 6, 5, 4, 3, 42])
  );

  // partition test
  expect(
    'partition test', [
      [2, 4, 6, 8],
      [1, 3, 5, 7]
    ],
    partition(isEven, [1, 2, 3, 4, 5, 6, 7, 8])
  );

  // partition test
  expect(
    'partition test', [
      [1, 2, 3],
      ['one', 'two', 'three']
    ],
    partition(isInteger, [1, 'one', 2, 'two', 3, 'three'])
  );

  // path test
  expect(
    'path test',
    42,
    path(['a', 'b', 'c'], {
      a: {
        b: {
          c: 42
        }
      }
    })
  );

  // path test
  expect(
    'path test',
    undefined,
    path(['a', 'e', 'c', 'd'], {
      a: {
        b: {
          c: 42
        }
      }
    })
  );

  // path test
  expect(
    'path test', [42],
    path([0, 1, 2, 3, 4], [
      [
        [],
        [
          [],
          [],
          [
            [],
            [],
            [],
            [
              [],
              [],
              [],
              [],
              [42]
            ]
          ]
        ]
      ]
    ])
  );

  // uncurryN test
  const curriedAdderFunc = a => b => c => d => {
    return a + b + c + d;
  };
  const uncurriedAdderFunc = uncurryN(4, curriedAdderFunc);

  try {
    uncurriedAdderFunc(1)(2)(3)(4);
  } catch (e) {
    expect(
      'uncurryN test',
      'the function curriedAdderFunc expects 4 arguments and it was called with only 1',
      e
    );
  }

  expect(
    'uncurryN test',
    50,
    uncurriedAdderFunc(11, 12, 13, 14)
  );

  // concat test
  expect(
    'concat test', [1, 2, 3, 4],
    concat([1, 2], [3, 4])
  );

  expect(
    'concat test', [1, 2, 3, 4],
    concat([1, 2, 3], 4)
  );

  // mergeWith test
  expect(
    'mergeWith test', {
      c: [1, 2, 3, 4],
      b: 2,
      a: 1
    },
    mergeWith(concat, {
      c: [1, 2],
      a: 1
    }, {
      c: [3, 4],
      b: 2
    })
  );

  // pathOr test
  expect(
    'pathOr test',
    'N/A',
    pathOr('N/A', ['a', 'e', 'c', 'd'], {
      a: {
        b: {
          c: 42
        }
      }
    })
  );

  // pathOr test
  expect(
    'pathOr test', [42],
    pathOr('N/A', [0, 1, 2, 3, 4], [
      [
        [],
        [
          [],
          [],
          [
            [],
            [],
            [],
            [
              [],
              [],
              [],
              [],
              [42]
            ]
          ]
        ]
      ]
    ])
  );

  // pathSatisfies test
  expect(
    'pathSatisfies test',
    true,
    pathSatisfies(curry(every)(isEven), [0, 1, 2, 3, 4], [
      [
        [],
        [
          [],
          [],
          [
            [],
            [],
            [],
            [
              [],
              [],
              [],
              [],
              [42, 2, 4, 6]
            ]
          ]
        ]
      ]
    ])
  );

  // pathSatisfies test
  expect(
    'pathSatisfies test',
    false,
    pathSatisfies(curry(every)(isEven), [0, 1, 2, 3, 4], [
      [
        [],
        [
          [],
          [],
          [
            [],
            [],
            [],
            [
              [],
              [],
              [],
              [],
              [42, 2, 4, 6, 1]
            ]
          ]
        ]
      ]
    ])
  );

  // unless test
  expect(
    'unless test',
    42,
    unless(x => !Number.isNaN(x), x => x * 2 + 16 * 2 - 2 * 2)(7)
  );

  // unless test
  expect(
    'unless test',
    null,
    unless(x => !Number.isNaN(x), x => x * 2 + 16 * 2 - 2 * 2)({} - 42)
  );

  // until test
  expect(
    'until',
    11,
    until(x => x > 10, x => x + 1, 0)
  );

  // until test
  expect(
    'until',
    128,
    until(x => x > 100, x => x * 2, 1)
  );

  // xprod test
  expect(
    'xprod test', [
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b']
    ],
    xprod([1, 2], ['a', 'b'])
  )

  // zipObj test
  expect(
    'zipObj test', {
      a: 1,
      b: 2,
      c: 3
    },
    zipObj(['a', 'b', 'c', 'd', 'e'], [1, 2, 3])
  )

  // deepFlat test
  expect(
    'deepFlat',
    [1, 2, 3, 4, 5],
    deepFlat([1, [[[2]]], [3], [[[[[4]]]]], 5])
  );

  // deepFlat test
  expect(
    'deepFlat',
    [1, 2, 3, 4, 5, 6],
    deepFlat([1, [[[2]]], [[[[3]]]], [[[[[[[[[4]]]]]]]]], 5, 6])
  );

  logTestsStatus(testsState);
}

function logTestsStatus(testsState) {
  console.log(`>>> ${testsState.allTests} tests were executed.`);
  console.log(`>>> ${testsState.passedTests} tests succeded.`);
  console.log(`>>> ${testsState.failedTests} tests failed.`);
}

function serialize(x) {
  return JSON.stringify(x);
}

function isPrimitiveType(a) {
  return find(x => x === typeof a, ['null', 'undefined', 'boolean', 'number', 'string', 'symbol']);
}

function equals(a, b) {
  return typeof a !== typeof b ? false : (
    isPrimitiveType(a) ? a === b : (
      'to be continued'
    )
  );
}

function expect(name, expectation, actual) {
  console.log(`RUNNING: ${name}`);
  // console.log(
  //   '->', serialize(expectation) === serialize(actual),
  //   '::', equals(expectation, actual)
  // );
  if (serialize(expectation) === serialize(actual)) {
    testsState.testPassed();
    console.log('TEST passed!');
  } else {
    testsState.testFailed();
    console.warn(`TEST >> ${name} << failed!`);
    console.log('expectation:');
    console.log(expectation);
    console.log('actual:');
    console.log(actual);
  }

  return new Promise(resolve => {
    resolve();
  });
}
