const composeP = require('./compose-p.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

async function composeP_test() {
  const getUserName = () => new Promise(resolve => setTimeout(() => resolve('John'), 500));
  const getUserAge = userName => new Promise(resolve => setTimeout(() => resolve(`${userName} 42`), 500));
  const getUserCity = userNameAndAge => new Promise(resolve => setTimeout(() => resolve(`${userNameAndAge} NY`), 500));

  await composeP(getUserCity, getUserAge, getUserName)().then(composeP => {
    expect('composeP', 'John 42 NY', composeP);
  });

  return new Promise(resolve => {
    resolve();
  });
}

module.exports = composeP_test;
