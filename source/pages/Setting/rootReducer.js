import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header,  login } from '../../reducers/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  header,
  login,
});

export default rootReducer;
