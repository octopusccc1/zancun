import DEFAULT_STATE from './initialState';
import {
  SET_TOTAL_NUM,
  REMOVE_LIST_ITEM,
  SET_INSIGHT_LOADING,
  EDIT_LIST_ITEM,
  SET_LIST,
  CHECK_ALL_LOADED,
  REDUCE_TOTAL_NUM
} from '../actionTypes';

const Landing = (state = DEFAULT_STATE, action) => {
  switch (action.type) {

    case SET_TOTAL_NUM:
      return Object.assign({}, state, {
        totalNum: action.totalNum,
      });

    case REDUCE_TOTAL_NUM:
      return Object.assign({}, state, {
        totalNum: state.totalNum -1,
      });

    case CHECK_ALL_LOADED:
      return Object.assign({}, state, {
        allLoaded: state.totalNum === state.list.length,
      });

    case SET_LIST:
      return Object.assign({}, state, {
        list: [...state.list, ...action.list],
        offset: state.offset + action.offset
      });

    case SET_INSIGHT_LOADING:
      return Object.assign({}, state, {
        isInsightLoading: action.status,
      });

    case REMOVE_LIST_ITEM:
      return Object.assign({}, state, {
        list: state.list.filter(x => x.id !== action.id),
        offset: state.offset - 1
      });

    case EDIT_LIST_ITEM:
      return Object.assign({}, state, {
        list: state.list.map(listItem => listItem.id === action.id ?
          Object.assign({}, listItem, action.obj) : listItem
        )
      });

    default:
      return state;
  }
};

export default Landing;
