export interface Spreadsheet {
  [k: string]: {
    value: string;
  };
}

export type Action = {
  cell: string;
  value: string;
};

const performMath = (expression: string) => {
  return expression.match(/[+\-]?([0-9\.\s]+)/g).reduce((result, value) => {
    return result + parseFloat(value);
  }, 0);
};

const spreadsheetReducer = (
  state: Spreadsheet = {},
  action: Action,
): Spreadsheet => {
  let { value } = action;
  const [, expression] = action.value.match(/^=(.*)/) || [];



  if (expression) {
    const cellsInvolved = expression.split(/[+]/g);
    const translated = expression.replace(new RegExp(cellsInvolved.join('|'), 'g'), (match) => state[match].value);
    value = performMath(translated);
  }

  return { ...state, [action.cell]: { value } };
};

export { spreadsheetReducer };
