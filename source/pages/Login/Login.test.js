// 测试示例文件
// 测试文件统一以Component + .test + .js 命名
import 'babel-polyfill';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login />', () => {
  test('should have a class called title', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find('.title').exists()).toBe(true);
  });
});
