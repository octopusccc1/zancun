import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header, login } from '../../../reducers/reducer';
import abnormalPage from './reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  header,
  login,
  abnormalPage
});

export default rootReducer;
