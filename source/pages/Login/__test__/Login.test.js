
import 'babel-polyfill';
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Breadcrumb, Icon, Input } from 'antd';

Enzyme.configure({ adapter: new Adapter() });

import Login from '../Login';

describe('<Login />', () => {

  let props,
    store,
    initialState;
  beforeEach(() => {

    document.body.innerHTML = '<div id="react-content"></div>';


    const mockStore = configureStore();
    initialState = {
      header: {
        isAuthenticated: true,
        name: 'ssss',
        account: ''
      },
      login: {
        isLoginErrorVisible: false,
        loginErrorText: '',
        fields: {
          username: 'username',
          password: 'passowrd',
          remember: true
        },
      }
    };

    store = mockStore(initialState);
  });

  test('比较快照', () => {
    const wrapper = shallow(
      <Login {...initialState.header} {...initialState.login} />,
      {
        context: { store: store },
        attachTo: document.getElementById('react-content'),
        childContextTypes: { store: PropTypes.object.isRequired }// 获取context需要这个

      });


    expect(wrapper).toMatchSnapshot();
  });



  function $$(query) {
    return document.querySelectorAll(query);
  }
});
