let grid: { [key: string]: string; } = {};
const Spreadsheet = {
  clear() {
    grid = {};
  },

  updateCell(value: string, x: string, y: string) {
    grid[x + y] = value;
  },

  getCellValue(x: string, y: string) {
    return grid[x + y] ? grid[x + y] : '';
  },
};

export { Spreadsheet };
