import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header } from '../../reducers/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  header,
});

export default rootReducer;
