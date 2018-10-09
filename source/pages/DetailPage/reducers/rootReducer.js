import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header, login } from '../../../reducers/reducer';
import advanced from './advancedDetail';
const rootReducer = combineReducers({
  routing: routerReducer,
  header,
  login,
  advanced
});

export default rootReducer;
