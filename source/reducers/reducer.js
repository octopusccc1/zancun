// 网站头部reducers
import debug from 'debug';
import initialState from './initialState';
import {
  SET_NAME,
  SET_LOGIN_RESULT,
  SET_AJAX_ERROR,
  SET_CONDITION,
  SET_DATA_LOADED,
  SET_DEFAULT,
  SET_PRIVATE_CONDITION,
  SET_PRIVATE_DATA_LOADED,
  SET_PRIVATE_DEFAULT
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

// 标签相关reducer
export const createByTag = (state = initialState.createByTag, action) => {
  switch (action.type) {

    case SET_CONDITION: {
      return Object.assign({}, state, {
        condition: action.condition,
      });
    }

    // 设置企业可用的标签列表
    case SET_DEFAULT: {
      let tags = action.tags.filter(filterValidValues);
      // url不带id
      return Object.assign({}, state, {
        defaultCondition: tags,
        condition: [],
      });
    }

    // 设置私有标签列表
    case SET_PRIVATE_CONDITION: {
      return Object.assign({}, state, {
        privateCondition: action.privateCondition,
      });
    }

    // 设置默认私有标签列表
    case SET_PRIVATE_DEFAULT: {
      let privateTags = action.privateTags.filter(filterValidValues);
      // url不带id
      return Object.assign({}, state, {
        defaultPrivateCondition: privateTags,
        privateCondition: [],
      });
    }

    case SET_AJAX_ERROR: {
      return Object.assign({}, state);
    }

    case SET_DATA_LOADED: {
      return Object.assign({}, state, {
        isDataLoaded: action.isDataLoaded
      });
    }

    case SET_PRIVATE_DATA_LOADED: {
      return Object.assign({}, state, {
        isPrivateDataLoaded: action.isPrivateDataLoaded
      });
    }

    default: {
      return state;
    }
  }
};
