// linkedListForEach :: Singly linked list L => (a -> *) -> L{a} -> L{a}
function linkedListForEach(fn, {head}) {
  return (function forEachNode(node) {
    fn(node);
    return node.next ? forEachNode(node.next) : undefined;
  })(head);
}

module.exports = linkedListForEach;