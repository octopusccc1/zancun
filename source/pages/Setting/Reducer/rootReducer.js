import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header,  login } from '../../../reducers/reducer';
import selfSetting from './selfSetting';
const rootReducer = combineReducers({
  routing: routerReducer,
  header,
  login,
  selfSetting
});

export default rootReducer;
