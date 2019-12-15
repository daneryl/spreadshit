import React from 'react'
import { shallow } from 'enzyme';
import { Grid } from '../Grid';
import { Cell } from '../Cell';
import { Row } from '../Row';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });
    
describe('Grid', () => {
  it('should render a grid of Cells with the number of rows/columns passed', () => {
    const props = {
      rowsNumber: 2,
      columnsNumber: 3
    };

    const wrapper = shallow(<Grid {...props} />)

    const Rows = wrapper.find(Row);
    expect(Rows.length).toBe(2);

    const ColumnsRow1 = Rows.at(0).find(Cell);
    expect(ColumnsRow1.length).toBe(3);

    const ColumnsRow2 = Rows.at(1).find(Cell);
    expect(ColumnsRow2.length).toBe(3);
  })
})
