const createStore = require('./create-store.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function createStore_test() {
  // createStore test
  const reducer = (state = {count: 0, users: []}, action = {}) => {
    let count = state.count, users = state.users;
    switch(action.type) {
      case 'INC_COUNT':
      count = count + action.payload;
      break;
      case 'DEC_COUNT':
      count = count - action.payload;
      break;
      case 'ADD_USER':
      users = [...users, action.payload]
      break;
    }

    return {...state, count, users};
  }

  let myStore = createStore(reducer);
  let subscriberOne = [];
  let subscriberTwo = [];

  myStore.subscribe((oldState, newState) => {
    subscriberOne = [...subscriberOne, {oldState, newState}];
  });
  myStore.subscribe((oldState, newState) => {
    subscriberTwo = [...subscriberTwo, {oldState, newState}];
  });

  compose(
    () => {
      expect('after dispatch ADD_USER', 10, subscriberOne.length + subscriberTwo.length);
      expect('after dispatch ADD_USER', {count: -1, users: ['Jack', 'Joe']}, myStore.getState());
    },
    () => myStore.dispatch({type: 'ADD_USER', payload: 'Joe'}),
    () => {
      expect('after dispatch ADD_USER', 8, subscriberOne.length + subscriberTwo.length);
      expect('after dispatch ADD_USER', {count: -1, users: ['Jack']}, myStore.getState());
    },
    () => myStore.dispatch({type: 'ADD_USER', payload: 'Jack'}),
    () => {
      expect('after dispatch DEC_COUNT', 6, subscriberOne.length + subscriberTwo.length);
      expect('after dispatch DEC_COUNT', {count: -1, users: []}, myStore.getState());
    },
    () => myStore.dispatch({type: 'DEC_COUNT', payload: 1}),
    () => {
      expect('after dispatch DEC_COUNT 1', 4, subscriberOne.length + subscriberTwo.length);
      expect('after dispatch DEC_COUNT 1', {count: 0, users: []}, myStore.getState());
    },
    () => myStore.dispatch({type: 'DEC_COUNT', payload: 1}),
    () => {
      expect('after dispatch INC_COUNT 1', 2, subscriberOne.length + subscriberTwo.length);
      expect('after dispatch INC_COUNT 1', {count: 1, users: []}, myStore.getState());
    },
    () => myStore.dispatch({type: 'INC_COUNT', payload: 1}),
    () => expect('initial state', {count: 0, users: []}, myStore.getState())
  )();
}

module.exports = createStore_test;
