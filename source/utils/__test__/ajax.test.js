
import 'babel-polyfill';
import React from 'react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';


beforeEach(() => {
  jest.resetModules();
});
describe('>>> util/ajax', () => {
  test('code为200时，正常resolve', () => {
    const response = {
      data: {
        code: 200,
        result: 'success',
      },
    };
    const $instance = jest.fn(() => {
      return Promise.resolve(response);
    });
    jest.doMock('axios', () => {
      return {
        create: () => $instance,
        isCancel: () => false,
      };
    });

    const request = require('../ajax').request;
    const p = request({ url: "/api/hello" });
    return expect(p).resolves.toBe(response.data);

  });

  test('code不为200时，reject', () => {
    //TODO: 未覆盖返回码为 4001 4002状态

    const response = {
      data: {
        code: 201,
        result: 'success',
      },
    };
    const $instance = jest.fn(() => {
      return Promise.resolve(response);
    });
    jest.doMock('axios', () => {
      return {
        create: () => $instance,
        isCancel: () => false,
      };
    });

    const request = require('../ajax').request;
    const p = request({ url: "/api/hello" });
    return expect(p).rejects.toBe(response.data);

  });

  test('由于服务器端返回http状态码不为2XX时，reject错误原因，code无效', () => {
    const response = {
      data: {
        code: 200,
        result: 'error',
      },
    };
    const $instance = jest.fn(() => {
      return Promise.reject({ response });
    });
    jest.doMock('axios', () => {
      return {
        create: () => $instance,
        isCancel: () => false,
      };
    });

    const request = require('../ajax').request;
    const p = request({ url: "/api/hello" });
    return expect(p).rejects.toBe(response.data);

  });

  test('由于客户端操作错误时，reject Error.message as result', () => {
    const response = new Error('错误');
    const $instance = jest.fn(() => {
      return Promise.reject(response);
    });
    jest.doMock('axios', () => {
      return {
        create: () => $instance,
        isCancel: () => false,
      };
    });

    const request = require('../ajax').request;
    const p = request({ url: "/api/hello" });
    return expect(p).rejects.toEqual({ result: response.message });

  });


});
