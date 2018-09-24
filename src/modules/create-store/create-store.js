const deepClone = require('../deep-clone/deep-clone.js');
const forEach = require('../for-each/for-each.js');

// createStore :: (State -> State) -> Store
function createStore(reducer) {
  let subscribers = [];
  let STORE = new Proxy({
      state: reducer()
    }, {
      set(obj, prop, value) {
        const oldState = obj[prop];
        obj[prop] = value;
        forEach(subscriber => { subscriber(deepClone(oldState), deepClone(obj[prop])); }, subscribers);
        return true;
      }
  });

  return {
    getState: () => STORE.state,
    dispatch: action => {
      STORE.state = reducer(STORE.state, action);
    },
    subscribe: fn => {
      subscribers = [...subscribers, fn]
    }
  };
}

module.exports = createStore;