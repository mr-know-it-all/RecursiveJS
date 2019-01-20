const linkedListForEach = require('./linked-list-for-each.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function linkedListForEach_test() {
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

  linkedListForEach(x => x.value = `${x.value}-modified`, listOfPoints);
  expect('linkedListForEach', expectedListOfPoints, listOfPoints);
}

module.exports = linkedListForEach_test;
