// linkedListToArray :: Singly linked list L => L{a} -> [a]
function linkedListToArray({head}) {
  return (function forEachNode(node, acc = []) {
    return node.next ? forEachNode(node.next, [...acc, node.value]) : [...acc, node.value];
  })(head);
}

module.exports = linkedListToArray;