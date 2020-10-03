import { parse } from './parser';

export type CellData = {
  value: string;
  rawValue: string;
};

export type SpreadsheetData = {
  [k: string]: CellData;
};

export type Action = {
  cell: string;
  value: string;
};

const reducer = (
  state: SpreadsheetData = {},
  action: Action,
): SpreadsheetData => ({
  ...state,
  [action.cell]: {
    value: parse(action.value, state),
    rawValue: action.value,
  },
});

export { reducer };
