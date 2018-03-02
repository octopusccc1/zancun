// 网站头部菜单选中状态
import queryString from 'query-string';
import { message } from 'antd';
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
import { setAccessToken, removeAccessToken, generateAuthPassword, request } from '../utils';
import { LOCAL_REMEMBER_ACCOUNT, LOCAL_REMEMBER_PASSWORD } from '../constants';
import { getConfig } from '../config';
const config = getConfig();

// 获取登录信息
export const fetchLogin = (fields, success) => {
  return dispatch => {
    let { username, remember } = fields;
    username = username.trim();
    // 1.0版本确认空格作为密码字符，不需要trim
    // let fieldPassword = fields.password.trim();
    let fieldPassword = fields.password;
    let password;
    const localPassword = localStorage.getItem(LOCAL_REMEMBER_PASSWORD);
    const gePassword = generateAuthPassword(fieldPassword);
    // 本地存储的密码==当前密码框内的value
    if ( localPassword && localPassword == fieldPassword ) {
      password = localPassword;
    } else {
      password = gePassword;
    }
    if ( remember ) {
      localStorage.setItem(LOCAL_REMEMBER_ACCOUNT, username);
      localStorage.setItem(LOCAL_REMEMBER_PASSWORD, password);
    } else {
      localStorage.removeItem(LOCAL_REMEMBER_ACCOUNT);
      localStorage.removeItem(LOCAL_REMEMBER_PASSWORD);
    }
    return request({
      url: '/api/prophet/user/login',
      method: 'POST',
      data: {
        // 手机号
        account: username,
        // account: 'jgg',
        // 密码
        password,
        // password:'e10adc3949ba59abbe56e057f20f883e'
      }
    })
    .then(
      // 登录成功
      json => {
        const redirectURL = queryString.parse(location.search).redirectURL;
        // 开发环境下写cookie方便测试
        if (config.useFrontCookie) {
          setAccessToken(json.access_token);
        }
        if (typeof success == 'function') {
          success(gePassword);
        }
        if (redirectURL) {
            const decodeUrl = decodeURIComponent(redirectURL);
            // 需要检查redirectURL是当前域，防止钓鱼网站钓鱼攻击
            if (decodeUrl.indexOf(location.host) > -1) {
              location.replace(decodeUrl);
            }
        }
      },
      // 登录失败
      error=>{
        dispatch(setLoginResult(true, error.result));
      }
    );
  };
};
// 获取登出信息
export const fetchLogout = (success) => {
  return dispatch => {
    return request({
      url: '/api/prophet/user/logout',
      method: 'GET',
    })
      .then((json) => {
        // 开发环境下写cookie方便测试
        if (config.useFrontCookie) {
          removeAccessToken();
        }
        // 登出成功
        if (json.code == 200) {
          location.replace(config.url.login);
        }
        if (typeof success == 'function') {
          success();
        }
      });
  };
};
// 点击登录按钮
export const loadLogin = (success) => {
  return (dispatch, getState) => {
    const { fields } = getState().login;
    return dispatch(fetchLogin(fields, success));
  };
};
// 点击退出按钮
export const loadLogout = () => {
  return (dispatch, getState) => {
    return dispatch(fetchLogout());
  };
};
// 设置姓名
export const setName = (name) => {
  return {
    type: SET_NAME,
    name,
  };
};
// 设置登录结果
export const setLoginResult = (isLoginErrorVisible, loginErrorText) => {
  return {
    type: SET_LOGIN_RESULT,
    isLoginErrorVisible,
    loginErrorText,
  };
};

// 获取企业可用的标签列表
export const fetchAllTagList = () => {
  return dispatch => request({
    url: '/api/tagging/tag/list/customer_group',
    method: 'GET',
  }).then(json => {
    const data = json.result;
    return data;
  }, error => {
    return dispatch(setAjaxError(error.result));
  });
};
// 获取企业可用的私有标签列表
export const fetchPrivateTagList = () => {
  return dispatch => request({
    url: '/api/tagging/privateTags',
    method: 'GET',
  }).then(json => {
    const data = json.result;
    return data;
  }, error => {
    return dispatch(setAjaxError(error.result));
  });
};
// 设置企业可用的标签列表
export const setDefault = (tags, detail) => {
  return {
    type: SET_DEFAULT,
    tags,
    detail,
  };
};
// 设置企业可用的私有标签列表
export const setPrivateDefault = (privateTags) => {
  return {
    type: SET_PRIVATE_DEFAULT,
    privateTags: privateTags.data,
  };
};
// 设置标签数据
export const setCondition = (condition) => {
  return {
    type: SET_CONDITION,
    condition,
  };
};
// 设置标签数据
export const setPrivateCondition = (privateCondition) => {
  return {
    type: SET_PRIVATE_CONDITION,
    privateCondition,
  };
};
// 接口错误
export const setAjaxError = (ajaxError) => {
  message.error(ajaxError);
  return {
    type: SET_AJAX_ERROR,
    error: ajaxError
  };
};
// 设置详情数据
export const setDataLoaded = (isDataLoaded) => {
  return {
    type: SET_DATA_LOADED,
    isDataLoaded,
  };
};
// 设置详情数据
export const setPrivateDataLoaded = (isPrivateDataLoaded) => {
  return {
    type: SET_PRIVATE_DATA_LOADED,
    isPrivateDataLoaded,
  };
};
