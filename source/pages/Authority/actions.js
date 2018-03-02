import { request } from '../../utils/';
import {
  SET_TOTAL_NUM,
  SET_LIST_LOADING,
  SET_LIST,
  CHANGE_ACCOUNT_TYPE,
  SET_CURRENT,
  SET_APP,
  UPDATE_APP_SECRET
} from './actionTypes';

import {message, Modal} from 'antd';
import {PAGE_SIZE} from '../../constants';

const setList = (list) => {
  return {
    type: SET_LIST,
    list: list
  };
};

const setListLoading = (status) => {
  return {
    type: SET_LIST_LOADING,
    status: status
  };
};

const setTotalNum = (count) => {
  return {
    type: SET_TOTAL_NUM,
    totalNum: count,
  };
};

const changeListItem = (id, role) => {
  return {
    type: CHANGE_ACCOUNT_TYPE,
    id,
    role,
  };
};

const setApp = (appKey, appSecret) => {
  return {
    type: SET_APP,
    appKey,
    appSecret,
  };
};

const updateAppSecret = (appSecret) => {
  return {
    type: UPDATE_APP_SECRET,
    appSecret,
  };
};

export const setCurrent = (count) => {
  return {
    type: SET_CURRENT,
    current: count,
  };
};

export const getAuthorityList = (currentPage) => {
  return dispatch => {
    dispatch(setListLoading(true));
    return request({
      url: '/api/prophet/user/list',
      method: 'GET',
      params: {
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
      },
    }).then(
      (json) => {
        dispatch(setListLoading(false));
        dispatch(setList(json.result.data));
        dispatch(setTotalNum(json.result.total));
      },
      function fail(json) {
        dispatch(setListLoading(false));
        message.error(json.result);
      }
    );
  };
};

export const deleteAccount = (id, success) => {
  return dispatch => {
    return request({
      url: `/api/prophet/user/${id}`,
      method: 'DELETE',
    }).then(
      (json) => {
        message.success('删除成功');
        if (typeof success === 'function') {
          success();
        }
      },
      function fail(json) {
        message.error(json.result);
      }
    );
  };
};

export const resetPassword = (id) => {
  return dispatch => {
    return request({
      url: '/api/prophet/user/password/reset',
      method: 'POST',
      data: {
        id
      },
    }).then(
      (json) => {
        Modal.success({
          title: `新密码为：${json.result}`,
          okText: '确定'
        });
      },
      function fail(json) {
        message.error(json.result);
      }
    );
  };
};

export const changeAccountType = (id, role, success) => {
  return dispatch => {
    return request({
      url: '/api/prophet/user/role/update',
      method: 'POST',
      data: {
        id,
        role
      },
    }).then(
      () => {
        dispatch(changeListItem(id, role));
        message.success('更改账号类型成功');
      },
      function fail(json) {
        message.error(json.result);
      }
    );
  };
};

export const createAccount = (accountInfo, success) => {
  return dispatch => {
    return request({
      url: '/api/prophet/user/create',
      method: 'POST',
      data: accountInfo,
    }).then(
      () => {
        if (typeof success === 'function') {
          success();
        }
        message.success('创建账号成功');
      },
      function fail(json) {
        message.error(json.result);
      }
    );
  };
};

export const initAppInfo = () => {
  return dispatch => {
    return request({
      url: '/api/prophet/tenant/appkey',
      method: 'GET',
    }).then(
      (json) => {
        dispatch(setApp(json.result.appKey, json.result.appSecret));
      },
      function fail(json) {
        message.error(json.result);
      }
    );
  };
};

export const resetAppSecret = () => {
  return dispatch => {
    return request({
      url: '/api/prophet/tenant/appkey/update',
      method: 'POST',
    }).then(
      (json) => {
        message.success('重置成功');
        dispatch(updateAppSecret(json.result));
      },
      function fail(json) {
        message.error(json.result);
      }
    );
  };
};



