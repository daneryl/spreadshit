import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Cell } from '../Cell';
import { CellData } from '../reducer';
import { Column } from '../Column';
import { Input } from '../Input';

configure({ adapter: new Adapter() });

describe('Cell', () => {
  it('should render default blank value', () => {
    const wrapper = shallow(<Cell onChange={() => {}} />);
    expect(wrapper.find(Column).text()).toBe('');
  });

  it('should render the value passed', () => {
    const cellData: CellData = {
      value: 'value',
      rawValue: 'rawValue',
    };

    const wrapper = shallow(<Cell cellData={cellData} onChange={() => {}} />);
    expect(wrapper.find(Column).text()).toBe('value');
  });

  describe('onClick', () => {
    it('should render an input with the rawValue', () => {
      const cellData: CellData = {
        value: 'value',
        rawValue: 'rawValue',
      };

      const wrapper = shallow(<Cell cellData={cellData} onChange={() => {}} />);
      wrapper.simulate('click');
      expect(wrapper.find(Column).find(Input).prop('value')).toBe('rawValue');
    });
  });

  describe('onFocus', () => {
    it('should render an input with the rawValue', () => {
      const cellData: CellData = {
        value: 'value',
        rawValue: 'rawValue',
      };

      const wrapper = shallow(<Cell cellData={cellData} onChange={() => {}} />);
      wrapper.simulate('focus');
      expect(wrapper.find(Column).find(Input).prop('value')).toBe('rawValue');
    });
  });

  describe('onChange', () => {
    it('should execute onChange callback passing input value', () => {
      const cellData: CellData = {
        value: 'value',
        rawValue: 'rawValue',
      };

      const onChange = jest.fn();
      const wrapper = shallow(<Cell cellData={cellData} onChange={onChange} />);
      wrapper.simulate('click');
      wrapper.find(Input).simulate('change', { target: { value: 'inputValue' } });

      expect(onChange).toHaveBeenCalledWith('inputValue');
    });
  });

  describe('onBlur', () => {
    it('should hide the input', () => {
      const cellData: CellData = {
        value: 'value',
        rawValue: 'rawValue',
      };

      const wrapper = shallow(<Cell cellData={cellData} onChange={() => {}} />);
      wrapper.simulate('click');
      wrapper.find(Input).simulate('blur');
      expect(wrapper.find(Column).text()).toBe('value');
    });
  });
});
