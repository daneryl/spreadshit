import { SpreadsheetData } from './reducer';

const performMath = (expression: string) =>
  // @ts-ignore
  expression
    .match(/[+-]?([0-9.\s]+)/g)
    .reduce((result, value) => result + parseFloat(value), 0)
    .toString();

const translateExpression = (
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

const parse = (value: string, state: SpreadsheetData): string => {
  const [, expression] = value.match(/^=(.*)/) || [];
  if (expression) {
    try {
      return performMath(translateExpression(expression, state));
    } catch (e) {
      return 'INVALID';
    }
  }
  return value;
};

export { parse };
