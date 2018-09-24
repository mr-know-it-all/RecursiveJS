const length = require('../length/length.js');
const forEach = require('../for-each/for-each.js');

// buildTrie :: Trie T => [String] | () -> T
function buildTrie(words = []) {
  function Trie() {
    this.root = {children: {}};

    this.insert = function(word) {
      let currentNode = this.root;

      forEach((letter, i) => {
        let key = `${word.slice(0, i)}${word[i]}`;
        if(currentNode.children[key]) {
          currentNode = currentNode.children[key];
          if(i === length(word) - 1)  currentNode.children[key].endWord = true;
        } else {
          let newNode = {children: {}};
          currentNode.children[key] = newNode;
          if(i === length(word) - 1) currentNode.children[key].endWord = true;
          currentNode = newNode;
        }
      }, [...word]);
    }

    this.hasWord = function(word) {
      return (function findWord(currentNode, i = 0) {
        let key = `${word.slice(0, i)}${word[i]}`;
        return (
          !currentNode.children[key]
            ? false
            : key === word
              ? true
              : findWord(currentNode.children[key], i + 1)
        );
      })(this.root);
    }

    // TODO
    this.remove = function() {}
  }

  let trie = new Trie();
  if(length(words) > 0) forEach(word => { trie.insert(word); }, words);
  return trie;
}

module.exports = buildTrie;