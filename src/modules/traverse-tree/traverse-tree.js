// traverseTree :: Tree -> [a] TODO: revisit this signature
function traverseTree(type, node) {
  return (
    type === 'preOrder' && (function preOrder(node) {
      return [
        node.data,
        ...(node.left ? preOrder(node.left) : []),
        ...(node.right ? preOrder(node.right) : [])
      ];
    })(node) ||
    type === 'inOrder' && (function inOrder(node) {
      return [
        ...(node.left ? inOrder(node.left) : []),
        node.data,
        ...(node.right ? inOrder(node.right) : [])
      ];
    })(node) ||
    type === 'postOrder' && (function postOrder(node) {
      return [
        ...(node.left ? postOrder(node.left) : []),
        ...(node.right ? postOrder(node.right) : []),
        node.data
      ];
    })(node)
  );
}

module.exports = traverseTree;