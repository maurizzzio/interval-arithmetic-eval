/**
 * Created by mauricio on 5/13/15.
 */
var compile = require('../');
var Interval = require('interval-arithmetic');

function example(exp, message, scope) {
  var code = compile(exp);
  var result = code.eval(scope);

  message && console.log('// ' + message);
  scope && console.log('// scope: ', scope);
  console.log(exp);
  console.log('> ', result);
  console.log('');
}

console.log('### Basic operations');
console.log('```javascript');
example('1');
example('-1', 'unary minus');
example('-1 + 3', 'floating point error is carried over in the operations');
example('1 / 3', '[1, 1] / [3, 3]');
example('-1 / 3');
example('-(1 / 3)');
example('-1 / -3');
example('2 * 3');
example('[1, 2]');
example('-[1, 2]');
example('[1, 2] + [-1, 2]');
example('[1, 2] - [-1, 2]', 'means [1, 2] + [-2, 1]');
example('[1, 2] * [-1, 2]');
example('[1, 2] / [2, 3]');
example('[-1, 1] / [2, 3]', 'if the upper interval has zero the result will also contain a zero');
example('[1, 2] / [-1, 1]', 'division by an interval that has zero results in a whole interval');
example('[-3, 2]^2', 'integer power');
example('[-3, 2]^-2', 'integer negative power, 1 / [-3, 2]^2 = 1 / [0, 9]');
example('[-3, 2]^3', 'integer power (odd power)');
console.log('```');

console.log('### Function calls');
console.log('```javascript');
example('ZERO + ONE', 'constants available in interval-arithmetic');
example('PI', 'constant available in interval-arithmetic');
example('negative(1)', 'same as -1');
example('add(-1, 3)', 'same as -1 + 3');
example('add([1, 2], [-1, 2])', 'same as [1, 2] + [-1, 2]');
example('cos(0)', 'cosine of the interval [0, 0]');
example('cos(PI)', 'cosine of the interval [PI_low, PI_high]');
example('cos(PI_HALF)', 'cosine of the interval [PI_low / 2, PI_high / 2] which contains zero');
example('cos([0, 3.15])', 'all the available values for cosine');
example('sin(PI_HALF)');
example('abs(-1)', 'absolute value of the interval [-1, 1]');
example('abs([-3, -2])', 'absolute value of the interval [-3, -2]');
example('abs([-2, 3])', 'absolute value of the interval [-2, 3]');
example('multiplicativeInverse(2)', '1 / 2');
console.log('```');

console.log('### Scope substitution');
console.log('```javascript');
example('x', 'using the number 4 stored in scope.x', {x: 4});
example('x', 'using the interval [2, 3] stored in scope.x', {x: [2, 3]});
example('x', 'using the interval Instance stored in scope.x', {x: new Interval(2, 3)});
example('ONE + x', 'adding a constant and a scope variable', {x: [1, 1]});
example('x / y', 'division between two variables stored in the scope', {x: [2, 3], y: [1, 2]});
example('sin(exp(x)) + tan(x) - 1/cos(PI) * [1, 3]^2', 'complex expression', {x: [0, 1]});
console.log('```');
