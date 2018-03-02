import {request} from '../../utils/';
import {
  SET_TOTAL_NUM,
  REMOVE_LIST_ITEM,
  SET_INSIGHT_LOADING,
  EDIT_LIST_ITEM,
  SET_LIST,
  CHECK_ALL_LOADED,
  REDUCE_TOTAL_NUM
} from './actionTypes';
import {message} from 'antd';

//加载完毕
const checkAllLoaded = () => {
  return {
    type: CHECK_ALL_LOADED
  };
};

//设置洞察总列表
const setList = (list, offset) => {
  return {
    type: SET_LIST,
    list: list,
    offset: offset
  };
};

//删除洞察项
const removeListItem = (id) => {
  return {
    type: REMOVE_LIST_ITEM,
    id: id
  };
};

//编辑洞察项
const editListItem = (id, obj) => {
  return {
    type: EDIT_LIST_ITEM,
    id: id,
    obj: obj
  };
};

//设置加载状态
const setInsightLoading = (status) => {
  return {
    type: SET_INSIGHT_LOADING,
    status: status
  };
};

const reduceTotalNum =(insightGroupCount)=>{
  return {
    type: REDUCE_TOTAL_NUM,
    totalNum: insightGroupCount,
  };
};
//设置洞察总数
export const setTotalNum = (insightGroupCount) => {
  return {
    type: SET_TOTAL_NUM,
    totalNum: insightGroupCount,
  };
};

//请求洞察列表
export const loadInsight = (offset) => {
  return dispatch => {
    dispatch(setInsightLoading(true));
    return request({
      url: '/api/prophet/insight/list',
      method: 'GET',
      params: {
        limit: 18,
        offset: offset,
      },
    }).then(
      (json) => {
        dispatch(setInsightLoading(false));
        dispatch(setList(json.result.data, json.result.data.length));
        dispatch(setTotalNum(json.result.total));
        dispatch(checkAllLoaded());
      },
      function fail(json) {
        dispatch(setInsightLoading(false));
        message.error(json.result);
      }
    );
  };
};

//删除洞察项
export const deleteInsight = (insightId, success) => {
  return dispatch => {
    return request({
      url: `/api/prophet/insight/${insightId}`,
      method: 'DELETE',
    }).then(
      (json) => {
        message.success('删除成功');
        dispatch(reduceTotalNum());
        dispatch(removeListItem(insightId));
        if (typeof success === 'function') {
          success(json.result);
        }
      },
      function fail(json) {
        message.error(json.result);
      }
    );
  };
};

//编辑洞察项
export const editInsight = (insightId, obj, success) => {
  return dispatch => {
    return request({
      url: `/api/prophet/insight/${insightId}`,
      method: 'PATCH',
      data: obj,
    }).then(
      (json) => {
        message.success('编辑成功');
        dispatch(editListItem(insightId, obj));
        if (typeof success === 'function') {
          success(json.result);
        }
      },
      function fail(json) {
        message.error(json.result);
      }
    );
  };
};
