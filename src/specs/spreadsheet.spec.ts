import { Spreadsheet } from '../Spreadsheet';

describe('spreadsheet', () => {
  beforeEach(() => {
    Spreadsheet.clear();
  });

  it('should save value passed for the cell', () => {
    Spreadsheet.updateCell('value', '1', 'a');
    Spreadsheet.updateCell('value2', '5', 'c');

    let value :string = Spreadsheet.getCellValue('1', 'a');
    expect(value).toBe('value');

    value = Spreadsheet.getCellValue('5', 'c');
    expect(value).toBe('value2');
  });

  it('should return empty string on unset cells', () => {
    let value :string = Spreadsheet.getCellValue('1', 'a');
    expect(value).toBe('');

    value = Spreadsheet.getCellValue('5', 'c');
    expect(value).toBe('');
  });
});
