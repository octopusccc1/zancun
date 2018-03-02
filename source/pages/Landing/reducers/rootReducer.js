import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header, login } from '../../../reducers/reducer';
import landing from './reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  header,
  login,
  landing
});

export default rootReducer;
