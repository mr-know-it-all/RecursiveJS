const length = require('../length/length.js');
const includes = require('../includes/includes.js');

// TODO: implement indexOf and replace it in all modules

// _isOpen_ :: [String, String] -> Char -> Boolean
const _isOpen_          = ([open, _]) => token => includes(token, open);
// _isClose_ :: [String, String] -> Char -> Boolean
const _isClose_         = ([_, close]) => token => includes(token, close);
// _isParen_ :: [String, String] -> Char -> Boolean
const _isParen_         = ([open, close]) => token => includes(token, `${open}${close}`);
// _getOposite_ :: [String, String] -> Char -> Boolean
const _getOposite_      = ([open, close]) => token => open[close.indexOf(token)];
// _hasValidWrapper_ :: [String, String] -> (Char, Char) -> Boolean
const _hasValidWrapper_ = ([open, _]) => (token, wrapper) =>
  wrapper === undefined || open.indexOf(wrapper) <= open.indexOf(token);

// validateParens :: [String, String] -> String
function validateParens(tokens, expr) {
  const getOposite      = _getOposite_(tokens);
  const isOpen          = _isOpen_(tokens);
  const isClose         = _isClose_(tokens);
  const isParen         = _isParen_(tokens);
  const hasValidWrapper = _hasValidWrapper_(tokens);

  return (function validate(expr, index, stack) {
    const token = expr[index];
    const [stackTop, ...restOfStack] = stack;

    return (
      token === undefined && !length(stack) ||
      !isParen(token) && validate(expr, index + 1, stack) ||
      isOpen(token) && hasValidWrapper(token, stackTop) && validate(expr, index + 1, [token, ...stack]) ||
      isClose(token) && getOposite(token) === stackTop && validate(expr, index + 1, restOfStack)
    );
  })(expr, 0, []);
}

module.exports = validateParens;
