function ListNode(value) {
  this.value = value;
  this.next = undefined;
}
function LinkedList(name) {
  this.name = name;
  this.head = undefined;
  this.length = 0;
}

// linkedListFromArray :: Singly linked list L => [a] -> L{a}
function linkedListFromArray(name, xs) {
  return (function buildList([x, ...xs], list = new LinkedList(name), nextNode) {
    if(x === undefined) return list;
    if(!list.head) return buildList(xs, (list.head = new ListNode(x), list.length++, list), list.head);
    return buildList(xs, (list.length++, list), (nextNode.next = new ListNode(x), nextNode.next));
  })(xs);
}

module.exports = linkedListFromArray;