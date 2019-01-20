const buildTrie = require('./build-trie.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function buildTrie_test() {
  let expectedTrie = {
    'root': {
      'children': {
      'a': {
        'children': {
          'ab': {
            'children': {
              'abc': {
                'children': {
                  'abcd': {
                    'children': {
                      'abcde': {
                        'children': {
                          'abcdef': {
                            'children': {},
                              'endWord': true
                            }
                          }
                        }
                      },
                      'endWord': true
                    }
                  }
                }
              }
            },
            'as': {
              'children': {
                'asd': {
                  'children': {
                    'asdf': {
                      'children': {
                        'asdfg': {
                          'children': {},
                          'endWord': true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  let Trie = buildTrie(['abcd', 'abcdef', 'asdfg']);
  expect('buildTrie test', expectedTrie, Trie);
  expect('buildTrie test', true, Trie.hasWord('asdfg'));
  expect('buildTrie test', false, Trie.hasWord('asdzfg'));
}

module.exports = buildTrie_test;
