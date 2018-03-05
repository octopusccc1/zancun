// 网站头部reducers
import debug from 'debug';
import initialState from './initialState';
import {
  SET_NAME,
  SET_LOGIN_RESULT
} from '../actions/actionTypes';

const appWarn = debug('app:warn');
// 过滤服务端给的错误数据
const filterValidValues = (item) => {
  const valid = item.values && item.values.length;
  if ( !valid ) {
    appWarn(`数据项：${item.tagType}/${item.text} 格式不符合规范!`, item);
  }
  return valid;
};

// 网站头部信息
export const header = (state = initialState.header, action) => {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, {
        name: action.name
      });
    default:
      return state;
  }
};
// 设置登录错误信息
export const login = (state = initialState.login, action) => {
  switch (action.type) {
    case SET_LOGIN_RESULT:
      return Object.assign({}, state, {
        isLoginErrorVisible: action.isLoginErrorVisible,
        loginErrorText: action.loginErrorText,
      });
    default:
      return state;
  }
};
