const validateParens = require('./validate-parens.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

const validExpr1 = '{[[(((<>)))]()((())())]}<>';
const validExpr2 = ',<()>.<()>,.';
const invalidExpr1 = '((([)))()((())(())';
const invalidExpr2 = '{[((({})))()((())())]}';
const invalidExpr3 = ',<()>.<()><,.>';

function validateParens_test() {
  compose(
    () => expect('validateParens test 1', true, validateParens(['{[(<', '}])>'], validExpr1)),
    () => expect('validateParens test 2', false, validateParens(['{[(', '}])'], invalidExpr1)),
    () => expect('validateParens test 3', false, validateParens(['{[(', '}])'], invalidExpr2)),
    () => expect('validateParens test 4', true, validateParens([',<(', '.>)'], validExpr2)),
    () => expect('validateParens test 4', false, validateParens([',<(', '.>)'], invalidExpr3))
  )();
}

module.exports = validateParens_test;
