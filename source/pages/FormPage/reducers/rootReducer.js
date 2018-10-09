import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header, login } from '../../../reducers/reducer';
import basicForm from './basicReducer';
import advancedForm from './advancedReducer';
import stepForm from './stepReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  header,
  login,
  basicForm,
  advancedForm,
  stepForm
});

export default rootReducer;
