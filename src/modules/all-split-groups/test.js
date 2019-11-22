const allSplitGroups = require('./all-split-groups.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function allSplitGroups_test() {
  compose(
    () => {
      const expected = [
        ["1234"], ["1", "234"], ["1", "2", "34"], ["1", "2", "3", "4"],
        ["1", "23", "4"], ["12","34"], ["12", "3", "4"], ["123", "4"]
      ];
      expect('allSplitGroups', expected, allSplitGroups('1234'));
    },
    () => {
      const expected = [['123'], ['1', '23'], ['1', '2', '3'], ['12', '3']];
      expect('allSplitGroups', expected, allSplitGroups('123'));
    }
  )();
}

module.exports = allSplitGroups_test;
