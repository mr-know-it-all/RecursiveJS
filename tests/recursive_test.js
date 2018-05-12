'use strict';

const [
  adjust, allPass, anyPass, aperture, applySpec,
  compose, composeP, concat, construct, converge, curry,
  deepFlat, defaultTo, dissoc, drop,
  equals, every,
  fill, filter, find, forEach,
  includes, innerJoin, intersection, intersperse, invoker,
  juxt,
  length,
  map, memoize, merge, mergeWith,
  objectEntries, objectValues, omit,
  partition, path, pathOr, pathSatisfies, pick, pluck, project,
  quickSort,
  reduce, reduceWhile, reverse,
  some, sortWith, strPaddEnd, strPaddStart, symetricDifference,
  take, takeWhile, tap, transpose,
  uncurryN, uniqueBy, unless, until,
  xprod,
  zip, zipObj
] = require('./../src/recursive.js');

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

  // adjust test
  compose(
    () => expect('adjust test 4', [1, 2, null, 4, 5], adjust(_ => null, 2, [1, 2, 3, 4, 5])),
    () => expect('adjust test 3', [1, 2, {}, 4, 5], adjust(_ => ({}), 2, [1, 2, 3, 4, 5])),
    () => expect('adjust test 2', [1, 2, [1, 2, 3], 4, 5], adjust(_ => [1, 2, 3], 2, [1, 2, 3, 4, 5])),
    () => expect('adjust test 1', [1, 2, 6, 4, 5], adjust(x => x + 3, 2, [1, 2, 3, 4, 5]))
  )();


  const isEven = x => x % 2 === 0;
  const isOdd = x => !isEven(x);
  const largerThanTwo = x => x > 2;
  const isInteger = x => Number.isInteger(x);

  const hasEvenNumber = xs => some(isEven, xs);
  const hasOddNumber = xs => some(isOdd, xs);
  const hasLargerThanTwo = xs => some(largerThanTwo, xs);
  const hasInteger = xs => some(isInteger, xs);

  // allPass test
  compose(
    () => expect('allPass 2', true, allPass([hasEvenNumber, hasLargerThanTwo, hasInteger])([4, 6, 8, 10, 3])),
    () => expect('allPass 1', false, allPass([hasEvenNumber, hasLargerThanTwo, hasInteger, hasOddNumber], [4, 6, 8, 10]))
  )();

  // anyPass test
  compose(
    () => expect('anyPass 3', true, anyPass([hasEvenNumber, hasOddNumber, hasLargerThanTwo, hasInteger])([4, 6, 8, 10])),
    () => expect('anyPass 2', false, anyPass([hasOddNumber, hasLargerThanTwo])([2, 2, 2])),
    () => expect('anyPass 1', true, anyPass([hasEvenNumber, hasLargerThanTwo, hasInteger])([4, 4, 1]))
  )();

  // aperture test
  compose(
    () => expect('aperture', [[1, 2], [2, 3], [3, 4], [4, 5]], aperture(2, [1, 2, 3, 4, 5])), // ramdajs test
    () => expect('aperture', [[1, 2, 3], [2, 3, 4], [3, 4, 5]], aperture(3, [1, 2, 3, 4, 5])), // ramdajs test
    () => expect('aperture', [], aperture(7, [1, 2, 3, 4, 5])) // ramdajs test
  )();

  // applySpec tests
  const sum = xs => reduce((acc, v) => acc + v, xs, 0);
  const average = xs => converge((x, y) => x / y)([sum, length])(xs);

  const specObject = {
    sum, average
  };
  const specObjectNested = {
    sum, average, nested: {sum}
  };

  const specObjectNestedTwice = {
    sum, average, nested: {nested: {sum}, nest: {nest: {average}}}
  };

  compose(
    () => {
      expect(
        'applySpec test 3', {
          sum: 10,
          average: 2.5,
          nested: {
            nested: {
              sum: 10
            },
            nest: {
              nest: {
                average: 2.5
              }
            }
          }
        },
        applySpec(specObjectNestedTwice)(1, 2, 3, 4)
      )
    },
    () => {
      expect(
        'applySpec test 2', {
          sum: 10,
          average: 2.5,
          nested: {
            sum: 10
          }
        },
        applySpec(specObjectNested)(1, 2, 3, 4)
      )
    },
    () => {
      expect(
        'applySpec test 1', {
          sum: 10,
          average: 2.5
        },
        applySpec(specObject)(1, 2, 3, 4)
      )
    }
  )();

  // compose test
  const addOne = x => x + 1;
  const multiplyByTwo = x => x * 2;

  expect('compose', multiplyByTwo(addOne(5)), compose(multiplyByTwo, addOne)(5));

  // composeP test
  const getUserName = () => new Promise(resolve => setTimeout(() => resolve('John'), 500));
  const getUserAge = userName => new Promise(resolve => setTimeout(() => resolve(`${userName} 42`), 500));
  const getUserCity = userNameAndAge => new Promise(resolve => setTimeout(() => resolve(`${userNameAndAge} NY`), 500));

  await composeP(getUserCity, getUserAge, getUserName)().then(composeP => {
    expect('composeP', 'John 42 NY', composeP);
  });

  // concat test
  compose(
    () => expect(
      'concat test', [1, 2, 3, 4],
      concat([1, 2])([3, 4])
    ),
    () => expect(
      'concat test', [1, 2, 3, 4],
      concat([1, 2, 3], 4)
    )
  )();

  // construct test
  function Garden(...args) {
    this.plants = args;
  }
  Garden.prototype.harvest = function() {
    return reduce(
      (acc, v) => length(acc) === 0 ? `My harvest: ${v}` : `${acc}, ${v}`,
      this.plants,
      ''
    );
  };
  const gardenConstructor = construct(Garden);
  const myGarden = gardenConstructor('onions', 'beans', 'tommatoes');

  expect(
    'construct test',
    'My harvest: onions, beans, tommatoes',
    myGarden.harvest()
  )

  // converge test
  compose(
    () => expect(
      'converge test',
      3.5,
      converge(
        (x, y) => x / y
      )([
        xs => reduce((acc, v) => acc + v, xs, 0),
        length
      ])([1, 2, 3, 4, 5, 6])
    ),
    () => expect(
      'converge test', [1, 6, 21, 6],
      converge(
        (...args) => args, [
          xs => Math.min(...xs),
          xs => Math.max(...xs),
          xs => reduce((acc, v) => acc + v, xs, 0),
          length
        ])([1, 2, 3, 4, 5, 6])
    ),
    () => expect(
      'converge test', [1, 1, 2, 6],
      converge(
        (...args) => deepFlat(args), [
          takeWhile(isOdd),
          take(2),
          length
        ])([1, 2, 3, 4, 5, 6])
    )
  )();

  // curry test
  let curryFunction = function(a, b, c, d) {
    return a + b + c + d;
  };

  expect('curry', curryFunction(1, 2, 3, 4), curry(curryFunction)(1)(2, 3)(4));

  // deepFlat test
  compose(
    () => expect(
      'deepFlat test',
      [1, 2, 3, 4, 5, 6],
      deepFlat([1, [[[2]]], [[[[3]]]], [[[[[[[[[4]]]]]]]]], 5, 6])
    ),
    () => expect(
      'deepFlat test',
      [1, 2, 3, 4, 5],
      deepFlat([1, [[[2]]], [3], [[[[[4]]]]], 5])
    )
  )();

  // defaultTo test
  compose(
    () => expect('defaultTo', 42, defaultTo(42)(NaN)),
    () => expect('defaultTo', '42', defaultTo(42)('42')),
    () => expect('defaultTo', NaN, defaultTo(NaN)(NaN))
  )();

  // dissoc test
  expect(
    'dissoc test', {
      a: 1,
      b: 2,
      c: 3
    },
    dissoc('d', {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    })
  )

  // drop test
  compose(
    ([data]) => {
      expect('drop', 'cd', drop(2, data));
    },
    data => {
      const expected = ['abcd'];
      expect('drop', expected, drop(2)(data));

      return expected;
    },
    data => {
      const expected = [6, 7, 'abcd'];
      expect('drop', expected, drop(2, data));

      return expected;
    },
    data => {
      const expected = [4, 5, 6, 7, 'abcd'];
      expect('drop', expected, drop(2)(data));

      return expected;
    }, () => {
      const expected = [2, 3, 4, 5, 6, 7, 'abcd'];
      expect('drop', expected, drop(1, [1, ...expected]));

      return expected;
    }
  )();

  // equals test
  compose (
    () => expect('equals 1', true, equals(true, true)),
    () => expect('equals 2', false, equals(true, false)),
    () => expect('equals 3', false, equals(NaN, false)),
    () => expect('equals 4', false, equals(undefined, null)),
    () => expect('equals 5', false, equals(undefined, false)),
    () => expect('equals 6', false, equals(true, 1)),
    () => expect('equals 7', false, equals([], '')),
    () => expect('equals 8', false, equals({}, [])),
    () => expect('equals 9', false, equals({}, new Map())),
    () => expect('equals 10', false, equals([], new Set())),
    () => expect('equals 11', true, equals([1, 2, 3], [1, 3, 2])),
    () => expect('equals 11', false, equals([1, 2, 3], [1, 3, 2, 3])),
    () => expect('equals 12', 'to be continued', equals([1, 2, 3], [1, 3, 2, 3, 'a'])),
    () => expect('equals 13', true, equals(x => y => x + 1 - y, x => y => x + 1 - y)),
    () => expect('equals 14', false, equals(x => y => x + 1 - y, x => y => x + 2 - y))
  )();

  // every test
  const everyArrayTrue = [false, false, false, true];
  const everyArrayFalse = [false, false, false, false, false];

  compose (
    () => expect('every', true, every(x => x !== true, everyArrayFalse)),
    () => expect('every', false, every(x => x !== true, everyArrayTrue))
  )();

  // fill test
  const fillArray = [1, 1, 1, 1, 1, 1];
  const fillArrayObjects = [{a: 1 }, {a: 1}, {a: 1}, {a: 1}, {a: 1}];

  compose (
    () => expect('fill', fillArrayObjects, fill({a: 1}, 5)),
    () => expect('fill', fillArray, fill(1, 6))
  )();

  // filter test
  expect('filter', [2, 4, 6], filter(x => x % 2 === 0, [1, 2, 3, 4, 5, 6]));

  // find test
  compose(
    () => expect('find', false, find(x => x === 42, [1, 2, 3, 4, 16])),
    () => expect('find', 4, find(x => x === 4)([1, 2, 3, 4]))
  )();

  // forEach test
  const arrayForEach = [1, 2, 3];
  forEach((x, index) => x * 2, arrayForEach);
  expect("forEach", [2, 4, 6], arrayForEach);

  // includes test
  compose(
    () => expect(
      'includes test',
      false,
      includes('d value', ['a value', 'b value', 'c value'])
    ),
    () => expect(
      'includes test',
      true,
      includes('a value')(['a value', 'b value', 'c value'])
    )
  )();

  // innerJoin test
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

  // intersperse test
  expect('intersperse', [1, '#', 2, '#', 3, '#', 4], intersperse('#', [1, 2, 3, 4]));

  // invoker tests
  compose(
    () => expect('invoker test 3', 'ghijklm', invoker(1, 'slice')(6, 'abcdefghijklm')),
    () => expect('invoker test 2', 'gh', invoker(2, 'slice')(6)(8, 'abcdefghijklm')),
    () => expect('invoker test 1', '--cd', invoker(2)('replace')('ab')('--')('abcd')),
    () => expect(
      'invoker test 1', 42,
      invoker(4, 'call')(
        {fn: (x, y, z) => x + y + z}, 39, 1, 2
      )(function(x, y, z) { return this.fn(x, y, z); })
    )
  )()

  // juxt test
  expect('juxt', [1, 9], juxt([Math.min, Math.max], [9, 1, 3, 1, 2, 3, 4, 5, 6]));

  // length test
  expect('length', 5, length([1, 2, 3, 4, 5]));

  // map test
  let mapArray = [1, 2, 3, 4];

  compose(
    () => expect('map', [1, 2, 3, 4], mapArray),
    () => expect('map', [2, 3, 4, 5], map(x => x + 1, mapArray))
  )();

  // memoize test
  let callCount = 0;
  const memoizeList = [
    [4, 2],
    [5, 1],
    [4, 2],
    [5, 1],
    [4, 2],
    [5, 1]
  ];
  const adder = (x, y) => (callCount++, x + y);
  const memoizedAdder = memoize(adder);

  map(([x, y]) => {memoizedAdder(x, y);}, memoizeList);

  expect(
    'memoize',
    callCount,
    compose(length, () => uniqueBy(([x, y]) => `${x}${y}`, memoizeList))()
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

  // mergeWith test
  expect(
    'mergeWith test', {
      c: [1, 2, 3, 4],
      b: 2,
      a: 1
    },
    mergeWith(concat)(
      {c: [1, 2], a: 1},
      {c: [3, 4], b: 2}
    )
  );

  // objectEntries test
  expect(
    'objectEntries test',
    [['a', 'a value'], ['b', 'b value'], ['c', 'c value']],
    objectEntries({a: 'a value', b: 'b value', c: 'c value'})
  );

  // objectValues test
  expect(
    'objectValues test',
    ['a value', 'b value', 'c value'],
    objectValues({a: 'a value', b: 'b value', c: 'c value'})
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

  // partition test
  compose(
    () => expect(
      'partition test', [
        [1, 2, 3],
        ['one', 'two', 'three']
      ],
      partition(isInteger)([1, 'one', 2, 'two', 3, 'three'])
    ),
    () => expect(
      'partition test', [
        [2, 4, 6, 8],
        [1, 3, 5, 7]
      ],
      partition(isEven, [1, 2, 3, 4, 5, 6, 7, 8])
    )
  )();

  // path test
  compose(
    () => {
      expect(
        'path test', [42],
        path([0, 1, 2, 3, 4])([[[], [[], [], [[], [], [], [[], [], [], [], [42]]]]]])
      );
    },
    () => expect(
      'path test',
      undefined,
      path(['a', 'e', 'c', 'd'], {a: {b: {c: 42}}})
    ),
    () => expect(
      'path test',
      42,
      path(['a', 'b', 'c'], {a: {b: {c: 42}}})
    )
  )();

  // pathOr test
  compose(
    () => expect(
      'pathOr test',
      'N/A',
      pathOr('N/A')(['a', 'e', 'c', 'd'], {a: {b: {c: 42}}})
    ),
    () => expect(
      'pathOr test', [42],
      pathOr('N/A', [0, 1, 2, 3, 4], [[[],[[],[], [[], [], [], [[], [], [], [], [42]]]]]])
    )
  )();

  // pathSatisfies test
  compose(
    () => expect(
      'pathSatisfies test',
      true,
      pathSatisfies(every(isEven), [0, 1, 2, 3, 4], [[[],[[],[], [[], [], [], [[], [], [], [], [42, 2, 4, 6]]]]]])
    ),
    () => expect(
      'pathSatisfies test',
      false,
      pathSatisfies(every(isEven))([0, 1, 2, 3, 4], [[[],[[],[], [[], [], [], [[], [], [], [], [42, 2, 4, 6, 1]]]]]])
    )
  )();

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
  compose(
    () => expect(
      'pluck', ['21', '22', '23'],
      pluck('age')([{
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
    ),
    () => expect(
      'pluck', [1, 2, 3, 4],
      pluck(0, [
        [1, 42],
        [2, 42],
        [3, 42],
        [4, 42]
      ])
    )
  )();

  // project test
  const people = [{
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

  // quickSort test
  expect('quickSort', [1, 2, 3, 4, 5, 6, 7, 8, 9], quickSort([7, 2, 1, 3, 5, 4, 6, 9, 8]));

  // reduce test
  expect('reduce', 15, reduce((acc, v) => acc + v, [1, 2, 3, 4, 5], 0));

  // reduceWhile test
  const add = (x, y) => x + y;
  const reduceWhileList1 = [5, 4, 3, 2, 1];
  const reduceWhileList2 = [1, 2, 3, 4, 5, 'six', 7, 8];

  compose(
    () => expect(
      'reduceWhile',
      15,
      reduceWhile(isInteger)(add, reduceWhileList2, 0)
    ),
    () => expect(
      'reduceWhile',
      12,
      reduceWhile(largerThanTwo, add, reduceWhileList1, 0)
    )
  )();

  // reverse test
  expect('reverse', [3, 2, 1], reverse([1, 2, 3]));

  // some test
  const someArrayTrue = [false, false, false, true];
  const someArrayFalse = [false, false, false, false];

  compose(
    () => expect('some', false, some(x => x === true)(someArrayFalse)),
    () => expect('some', true, some(x => x === true, someArrayTrue))
  )();

  // sortWith test
  compose(
    () => expect(
      'sortWith test 1',
      [1, 2, 3, 4],
      sortWith((a, b) => a > b ? 1 : a < b ? -1 : 0, [2, 1, 4, 3])
    ),
    () => expect(
      'sortWith test 2',
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      sortWith((a, b) => a > b ? 1 : a < b ? -1 : 0, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    ),
    () => expect(
      'sortWith test 3',
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      sortWith((a, b) => a > b ? 1 : a < b ? -1 : 0, [2, 9, 8, 1, 6, 5, 4, 3, 10, 7])
    ),
    () => expect(
      'sortWith test 4',
      ['a', 'b', 'c', 'd'],
      sortWith((a, b) => a > b ? 1 : a < b ? -1 : 0, ['d', 'a', 'c', 'b'])
    )
  )();

  // strPaddEnd test
  compose(
    () => expect('strPaddEnd', '100', strPaddEnd(0, 3, '1')),
    () => expect('strPaddEnd', '111', strPaddEnd(0)(3, '111')),
    () => expect('strPaddEnd', '1###', strPaddEnd('#', 4, '1')),
    () => expect('strPaddEnd', '1#######', strPaddEnd('#')(8, '1'))
  )();


  // strPaddStart test
  compose(
    () => expect('strPaddStart', '001', strPaddStart(0, 3, '1')),
    () => expect('strPaddStart', '111', strPaddStart(0, 3, '111')),
    () => expect('strPaddStart', '###1', strPaddStart('#', 4, '1')),
    () => expect('strPaddStart', '01', strPaddStart(0)(2, '1'))
  )();

  // symetricDifference test
  expect(
    'symetricDifference', [1, 2, 7, 6, 5, 42],
    symetricDifference([1, 2, 3, 4], [7, 6, 5, 4, 3, 42])
  );

  // take test
  expect('take', [1, 2, 3], take(3, [1, 2, 3, 4, 5, 6, 7]));

  // takeWhile test
  expect('takeWhile', [1, 2, 3, 4, 5], takeWhile(x => x <= 5, [1, 2, 3, 4, 5, 6, 7]));

  // tap test
  compose(
    () => expect('tap test 1', 42, tap(x => x + 2, 42)),
    () => expect('tap test 2', {a: 2}, tap(x => {x.a = 2}, {a: 1}))
  )();

  // transpose test
  compose(
    () => expect('transpose test 3', [[10, 20, 30], [11, 31], [32]], transpose([[10, 11], [20], [], [30, 31, 32]])), // ramdajs example
    () => expect('transpose test 2', [[1, 'a'], [2, 'b'], [3, 'c']], transpose([[1, 2, 3], ['a', 'b', 'c']])), // ramdajs example
    () => expect('transpose test 1', [[1, 2, 3], ['a', 'b', 'c']], transpose([[1, 'a'], [2, 'b'], [3, 'c']])), // ramdajs example
    () => expect('transpose test 1', [[1, 2, 3], ['a', 'b', 'c'], [11, 12, 13]], transpose([[1, 'a', 11], [2, 'b', 12], [3, 'c', 13]]))
  )();

  // uncurryN test
  const curriedAdderFunc = a => b => c => d => a + b + c + d;
  const uncurriedAdderFunc = uncurryN(4)(curriedAdderFunc);

  compose(
    () => expect(
      'uncurryN test',
      50,
      uncurriedAdderFunc(11, 12, 13, 14)
    ),
    () => {
      try {
        uncurriedAdderFunc(1)(2)(3)(4);
      } catch (e) {
        expect(
          'uncurryN test',
          'the function curriedAdderFunc expects 4 arguments and it was called with only 1',
          e
        );
      }
    }
  )();

  // uniqueBy test
  expect('uniqueBy', [1, 2, 3], uniqueBy(x => x, [1, 2, 1, 2, 3, 3, 3, 1]));
  expect(
    'unique',
    [{id: 1}, {id: 2}, {id: 3}],
    uniqueBy(
      ({id}) => id,
      [{id: 1}, {id: 1}, {id: 2}, {id: 2}, {id: 3}, {id: 3}]
    )
  );

  // unless test
  compose(
    () => expect(
      'unless test',
      null,
      unless(x => !Number.isNaN(x), x => x * 2 + 16 * 2 - 2 * 2)({} - 42)
    ),
    () => expect(
      'unless test',
      42,
      unless(x => !Number.isNaN(x), x => x * 2 + 16 * 2 - 2 * 2)(7)
    )
  )();

  // until test
  compose(
    () => expect(
      'until',
      128,
      until(x => x > 100, x => x * 2, 1)
    ),
    () => expect(
      'until',
      11,
      until(x => x > 10, x => x + 1, 0)
    )
  )();

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

  // zip test
  expect(
    'zip', [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ],
    zip([1, 2, 3], ['a', 'b', 'c', 'd', 'e'])
  );

  // zipObj test
  expect(
    'zipObj test', {
      a: 1,
      b: 2,
      c: 3
    },
    zipObj(['a', 'b', 'c', 'd', 'e'], [1, 2, 3])
  )

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

function expect(name, expectation, actual) {
  if (serialize(expectation) === serialize(actual)) {
    testsState.testPassed();
    // console.log('TEST passed!');
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
