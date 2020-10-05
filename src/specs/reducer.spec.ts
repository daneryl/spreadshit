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
    let action = { cell: 'a1', value: '=c' };
    let state = reducer(prevState, action);

    expect(state).toEqual({
      a1: { value: 'INVALID', rawValue: '=c' },
    });

    action = { cell: 'a1', value: '=1+ccc' };
    state = reducer(prevState, action);

    expect(state).toEqual({
      a1: { value: 'INVALID', rawValue: '=1+ccc' },
    });
  });

  describe('SUM', () => {
    it('should add all cells passed comma separated', () => {
      const prevState: SpreadsheetData = {
        a2: { value: '66', rawValue: '66' },
        a5: { value: '5', rawValue: '5' },
        b8: { value: '1', rawValue: '1' },
      };
      const action = { cell: 'a1', value: '=SUM(a2,a5,b8)' };
      const state = reducer(prevState, action);

      expect(state.a1).toEqual({
        value: '72',
        rawValue: '=SUM(a2,a5,b8)',
      });
    });

    it('should add all cells specified by a range', () => {
      const prevState: SpreadsheetData = {
        a2: { value: '66', rawValue: '66' },
        a5: { value: '5', rawValue: '5' },
        a7: { value: '1', rawValue: '1' },
        a8: { value: '5.2', rawValue: '5.2' },
      };
      const action = { cell: 'b1', value: '=SUM(a1:a10)' };
      const state = reducer(prevState, action);

      expect(state.b1).toEqual({
        value: '77.2',
        rawValue: '=SUM(a1:a10)',
      });
    });

    it('should be able to combine a range and specific cells', () => {
      const prevState: SpreadsheetData = {
        a2: { value: '66', rawValue: '66' },
        a5: { value: '5', rawValue: '5' },
        a7: { value: '1', rawValue: '1' },
        a8: { value: '5.2', rawValue: '5.2' },
        b5: { value: '55.7', rawValue: '55.7' },
      };
      const action = { cell: 'b1', value: '=SUM(a1:a10,b5)' };
      const state = reducer(prevState, action);

      expect(state.b1).toEqual({
        value: '132.9',
        rawValue: '=SUM(a1:a10,b5)',
      });
    });

    it('should be able to combine multiple ranges', () => {
      const prevState: SpreadsheetData = {
        a2: { value: '66', rawValue: '66' },
        a5: { value: '5', rawValue: '5' },
        a7: { value: '1', rawValue: '1' },
        a8: { value: '5', rawValue: '5' },
        b1: { value: '1', rawValue: '1' },
        b5: { value: '1', rawValue: '1' },
        b9: { value: '45', rawValue: '45' },
        c56: { value: '10', rawValue: '10' },
      };
      const action = { cell: 'testCell', value: '=SUM(A1:a10,b1:b100,c56)' };
      const state = reducer(prevState, action);

      expect(state.testCell).toEqual({
        value: '134',
        rawValue: '=SUM(A1:a10,b1:b100,c56)',
      });
    });
  });

  describe('AVG', () => {
    it('should average cells passed', () => {
      const prevState: SpreadsheetData = {
        a2: { value: '66', rawValue: '66' },
        a5: { value: '5', rawValue: '5' },
        b8: { value: '1', rawValue: '1' },
      };
      const action = { cell: 'a1', value: '=AVG(a2,a5,b8)' };
      const state = reducer(prevState, action);

      expect(state.a1).toEqual({
        value: '24',
        rawValue: '=AVG(a2,a5,b8)',
      });
    });

    it('should be able to combine multiple ranges', () => {
      const prevState: SpreadsheetData = {
        a2: { value: '66', rawValue: '66' },
        a5: { value: '5', rawValue: '5' },
        a7: { value: '1', rawValue: '1' },
        a8: { value: '5', rawValue: '5' },
        b1: { value: '1', rawValue: '1' },
        b5: { value: '1', rawValue: '1' },
        b9: { value: '45', rawValue: '45' },
        c56: { value: '10', rawValue: '10' },
      };
      const action = { cell: 'testCell', value: '=AVG(A1:a10,b1:b100,c56)' };
      const state = reducer(prevState, action);

      expect(state.testCell).toEqual({
        value: '16.75',
        rawValue: '=AVG(A1:a10,b1:b100,c56)',
      });
    });
  });
});
