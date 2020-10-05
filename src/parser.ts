import { SpreadsheetData } from './reducer';
import { range } from './utils';

const toFloat = (str: string) => {
  const result = parseFloat(str);
  if (Number.isNaN(result)) {
    throw new Error('NaN');
  }
  return result;
};

const performMath = (expression: string) =>
  // @ts-ignore
  expression
    .match(/[+-]?([a-z.|0-9.]+)/g)
    .reduce((result, value) => result + toFloat(value), 0);

const replaceCellWithValues = (
  expression: string,
  state: SpreadsheetData,
): string => expression.replace(
  new RegExp(expression.split(/[+|-]/g).join('|'), 'g'),
  (match: string) => state[match]?.value || match,
);

const expandRanges = (expression: string, state: SpreadsheetData) =>
  expression
    .toLowerCase()
    .split(',')
    .reduce<string[]>((result, possibleRange) => {
      const [, rangeMatch] = possibleRange.match(/(.*:.*)/) || [];
      if (!rangeMatch) {
        return result.concat([possibleRange]);
      }

      const [, letter, start, end] =
        rangeMatch.match(/([a-z])(\d+):[a-z](\d+)/) || [];

      return result.concat([
        range(parseInt(start, 10), parseInt(end, 10))
          .map(n => `${letter}${n}`)
          .filter(cell => state[cell])
          .join(','),
      ]);
    }, [])
    .join(',');

const parseFunction = (cellExpression: string) => {
  const [, functionName, expression] =
    cellExpression.match(/^(SUM|AVG)\((.*)\)/) || [];

  if (!functionName) {
    return ['default', cellExpression];
  }

  return [functionName, expression];
};

const parse = (value: string, state: SpreadsheetData): string => {
  const [, cellExpression] = value.match(/^=(.*)/) || [];
  if (cellExpression) {
    try {
      const [functionName, expression] = parseFunction(cellExpression);

      const mathExpression = replaceCellWithValues(
        expandRanges(expression, state).replace(/,/g, '+'),
        state,
      );

      let result = performMath(mathExpression);

      if (functionName === 'AVG') {
        result /= mathExpression.split('+').length;
      }

      return result.toString();
    } catch (e) {
      return 'INVALID';
    }
  }
  return value;
};

export { parse };
