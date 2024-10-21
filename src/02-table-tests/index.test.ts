import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 2, b: 3, action: 'invalid_action', expected: null },
  { a: '2', b: 3, action: Action.Add, expected: null },
  { a: 2, b: '3', action: Action.Add, expected: null },
  { a: 2, b: 3, action: 123, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
