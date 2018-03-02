import DEFAULT_STATE from './initialState';
import {combineReducers} from 'redux';
import {
  SET_TOTAL_NUM,
  SET_LIST_LOADING,
  SET_LIST,
  CHANGE_ACCOUNT_TYPE,
  SET_CURRENT,
  SET_APP,
  UPDATE_APP_SECRET
} from '../actionTypes';

const authority = (state = DEFAULT_STATE.authority, action) => {

  switch (action.type) {
    case SET_TOTAL_NUM:
      return Object.assign({}, state, {
        totalNum: action.totalNum,
      });

    case SET_CURRENT:
      return Object.assign({}, state, {
        current: action.current,
      });

    case SET_LIST:
      return Object.assign({}, state, {
        list: [...action.list]
      });

    case SET_LIST_LOADING:
      return Object.assign({}, state, {
        isListLoading: action.status,
      });

    case CHANGE_ACCOUNT_TYPE:
      return Object.assign({}, state, {
        list: state.list.map(listItem => listItem.id === action.id ?
          Object.assign({}, listItem, {role: action.role}) : listItem
        )
      });

    default:
      return state;
  }
};

const developerID = (state = DEFAULT_STATE.developerID, action) => {
  switch (action.type) {

    case SET_APP:
      return Object.assign({}, state, {
        appKey: action.appKey,
        appSecret: action.appSecret
      });

    case UPDATE_APP_SECRET:
      return Object.assign({}, state, {
        appSecret: action.appSecret,
      });

    default:
      return state;
  }
};

export default combineReducers({
  authority,
  developerID
});
