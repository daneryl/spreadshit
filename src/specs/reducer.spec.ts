import { reducer, SpreadsheetData } from '../reducer';

describe('spreadsheet reducer', () => {
  it('should save value passed for the cell, without changing other cells', () => {
    const prevState: SpreadsheetData = { a34: { value: '66', rawValue: '66' } };
    const action = { cell: 'a1', value: '5' };
    const state = reducer(prevState, action);

    expect(state).toEqual({
      a1: { value: '5', rawValue: '5' },
      a34: { value: '66', rawValue: '66' },
    });
  });

  it('should be able to reference other cell value', () => {
    const prevState: SpreadsheetData = {
      a2: { value: '66', rawValue: '66' },
    };
    const action = { cell: 'a1', value: '=a2' };
    const state = reducer(prevState, action);

    expect(state).toEqual({
      a1: { value: '66', rawValue: '=a2' },
      a2: { value: '66', rawValue: '66' },
    });
  });

  it('should be able to use "+" operations referencing other cells', () => {
    const prevState: SpreadsheetData = {
      a2: { value: '66', rawValue: '66' },
      b3: { value: '5', rawValue: '5' },
    };
    const action = { cell: 'a1', value: '=a2+b3' };
    const state = reducer(prevState, action);

    expect(state.a1.value).toEqual('71');
  });

  it('should be able to use "-" operations referencing other cells', () => {
    const prevState: SpreadsheetData = {
      a2: { value: '66', rawValue: '66' },
      b3: { value: '5', rawValue: '5' },
      g45: { value: '70', rawValue: '70' },
    };
    const action = { cell: 'a1', value: '=a2+b3-g45' };
    const state = reducer(prevState, action);

    expect(state.a1.value).toEqual('1');
  });

  it('should be able to operate with arbitrary numbers', () => {
    const prevState: SpreadsheetData = {
      a2: { value: '66', rawValue: '66' },
    };
    const action = { cell: 'a1', value: '=a2+14' };
    const state = reducer(prevState, action);

    expect(state).toEqual({
      a1: { value: '80', rawValue: '=a2+14' },
      a2: { value: '66', rawValue: '66' },
    });
  });

  it('should not fail and set INVALID value when there is an error on an expression', () => {
    const prevState: SpreadsheetData = {};
    const action = { cell: 'a1', value: '=c' };
    const state = reducer(prevState, action);

    expect(state).toEqual({
      a1: { value: 'INVALID', rawValue: '=c' },
    });
  });
});
