// 测试示例文件
// 测试文件统一以Component + .test + .js 命名
import 'babel-polyfill';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from './NotFound';

Enzyme.configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
  test('should have a header called \'404\'', () => {
    const wrapper = shallow(<NotFound />);
    const actual = wrapper.find('h1').text();
    const expected = '404';

    expect(actual).toBe(expected);
    expect(wrapper.find('h1').hasClass('title')).toBe(true);
  });
});
