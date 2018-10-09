import DEFAULT_STATE from './initialState';

import {
  SET_FORM
} from '../actionTypes';
const step = (state = DEFAULT_STATE.stepForm, action) => {
  switch (action.type) {
    case SET_FORM:{
      return Object.assign({},state,{
        step1: {
          ...state.step1,
          ...action.changedFields
        }
      })
    }
    
    default:
    return state;
  }
}

export default step;