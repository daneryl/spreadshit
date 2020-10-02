import { spreadsheetReducer, Spreadsheet } from '../spreadsheetReducer';

describe('spreadsheet reducer', () => {
  it('should save value passed for the cell, without changing other cells', () => {
    const prevState = { a34: { value: '66' } };
    const action = { cell: 'a1', value: '5' };
    const state = spreadsheetReducer(prevState, action);

    expect(state).toEqual({ a1: { value: '5' }, a34: { value: '66' } });
  });

  it('should be able to use + operations referencing other cells', () => {
    let prevState: Spreadsheet = { a2: { value: '66' }, b3: { value: '5' } };
    let action = { cell: 'a1', value: '=a2+b3' };
    let state = spreadsheetReducer(prevState, action);

    expect(state.a1.value).toEqual(71);

    prevState = { c2: { value: '2' }, b3: { value: '5' } };
    action = { cell: 'a1', value: '=c2+b3' };
    state = spreadsheetReducer(prevState, action);

    expect(state.a1.value).toEqual(7);
  });
});
