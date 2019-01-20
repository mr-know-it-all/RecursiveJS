'use strict';

require('./../src/recursive.js')().then(modules => {
  const tests = Object.values(modules).filter(({name}) => name.split('_').includes('test'))

  async function runTestsAsync() {
    while(tests.length > 0) {
      await (tests.shift())();
    }

    logTestsStatus(testsState);
  }
  runTestsAsync();
});

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

function logTestsStatus(testsState) {
  console.log(`>>> ${testsState.allTests} tests were executed.`);
  console.log(`>>> ${testsState.passedTests} tests succeded.`);
  console.log(`>>> ${testsState.failedTests} tests failed.`);
}

function serialize(x) {
  return JSON.stringify(x, null, 2);
}



function expect(name, expectation, actual) {
  if(serialize(expectation) === serialize(actual)) {
    testsState.testPassed();
    //console.log('TEST passed!');
  } else {
    testsState.testFailed();
    console.warn(`TEST >> ${name} << failed!`);
    console.log('expectation:');
    console.log(serialize(expectation));
    console.log('actual:');
    console.log(serialize(actual));
  }


  return new Promise(resolve => {
    resolve();
  });
}

module.exports.expect = expect;
