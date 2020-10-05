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
): string => {
  const cellsInvolved = expression.split(/[+|-]/g);
  const translated = expression.replace(
    new RegExp(cellsInvolved.join('|'), 'g'),
    (match: string) => state[match]?.value || match,
  );
  return translated;
};

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

const parse = (value: string, state: SpreadsheetData): string => {
  const [, expression] = value.match(/^=(.*)/) || [];
  if (expression) {
    try {
      const [, sumExpression] = expression.match(/^SUM\((.*)\)/) || [];
      if (sumExpression) {
        return performMath(
          replaceCellWithValues(
            expandRanges(sumExpression, state).replace(/,/g, '+'),
            state,
          ),
        ).toString();
      }
      const [, avgExpression] = expression.match(/^AVG\((.*)\)/) || [];
      if (avgExpression) {
        const mathExpression = replaceCellWithValues(
          expandRanges(avgExpression, state).replace(/,/g, '+'),
          state,
        );
        return (
          performMath(mathExpression) / mathExpression.split('+').length
        ).toString();
      }
      return performMath(replaceCellWithValues(expression, state)).toString();
    } catch (e) {
      return 'INVALID';
    }
  }
  return value;
};

export { parse };
