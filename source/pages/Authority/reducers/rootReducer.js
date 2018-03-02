import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header, login } from '../../../reducers/reducer';
import Authority from './reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  header,
  login,
  Authority
});

export default rootReducer;
