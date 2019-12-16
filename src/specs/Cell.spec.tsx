import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Cell } from '../Cell';

configure({ adapter: new Adapter() });

describe('Cell', () => {
  it('should render the value passed', () => {
    const props = {
      value: 'value',
    };

    const wrapper = shallow(<Cell {...props} />);
    expect(wrapper.html()).toBe('<div>value</div>');
  });

  describe('onClick', () => {
    it('should render an input with the originalValue', () => {
      const props = {
        value: 'value',
      };

      const wrapper = shallow(<Cell {...props} />);
      wrapper.simulate('click');
      expect(wrapper.html()).toBe('<div><input/></div>');
    });
  });

  describe('onBlur', () => {
    it('should hide the input', () => {
      const props = {
        value: 'value',
      };

      const wrapper = shallow(<Cell {...props} />);
      wrapper.simulate('click');
      wrapper.find('input').simulate('blur');
      expect(wrapper.html()).toBe('<div>value</div>');
    });
  });
});
