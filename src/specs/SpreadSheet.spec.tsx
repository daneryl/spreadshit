import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SpreadSheet } from '../SpreadSheet';
import { Cell } from '../Cell';

configure({ adapter: new Adapter() });

describe('SpreadSheet', () => {
  it('should dispatch on onChange event with the correct cell coordinates', () => {
    const wrapper = shallow(<SpreadSheet rows={2} columns={3} />);
    const cells = wrapper.find(Cell);
    cells.at(1).simulate('change', 'value');

    wrapper.update();
    expect(wrapper.find(Cell).at(0).prop('cellData')).toBeUndefined();
    expect(wrapper.find(Cell).at(1).prop('cellData')).toEqual({
      value: 'value',
      rawValue: 'value',
    });
  });
});
