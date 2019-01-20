const linkedListFromArray = require('./linked-list-from-array.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function linkedListFromArray_test() {
  function ListNode(value) {
    this.value = value;
    this.next = undefined;
  }
  function LinkedList(name) {
    this.name = name;
    this.head = undefined;
    this.length = 0;
  }

  let listOfPoints = new LinkedList('list of points');
  listOfPoints.head = new ListNode('A');
  listOfPoints.length++;
  listOfPoints.head.next = new ListNode('B');
  listOfPoints.length++;
  listOfPoints.head.next.next = new ListNode('C');
  listOfPoints.length++;
  listOfPoints.head.next.next.next = new ListNode('D');
  listOfPoints.length++;

  let expectedListOfPoints = new LinkedList('list of points');
  expectedListOfPoints.head = new ListNode('A-modified');
  expectedListOfPoints.length++;
  expectedListOfPoints.head.next = new ListNode('B-modified');
  expectedListOfPoints.length++;
  expectedListOfPoints.head.next.next = new ListNode('C-modified');
  expectedListOfPoints.length++;
  expectedListOfPoints.head.next.next.next = new ListNode('D-modified');
  expectedListOfPoints.length++;

  expect('linkedListFromArray', expectedListOfPoints, linkedListFromArray('list of points', ['A-modified', 'B-modified', 'C-modified', 'D-modified']));
}

module.exports = linkedListFromArray_test;
