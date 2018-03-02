/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Root from '../../pages/Root';
import configureStore from '../../store/configureStore';
import {rootReducer, routes} from '../../pages/Landing';
import DEFAULT_STATE from '../../pages/Landing/reducers/initialState';

const pageInfo = window.setting && window.setting.landing;
const store = configureStore(rootReducer, {
  landing: {
    ...DEFAULT_STATE,
    totalNum: pageInfo.insightCount
  }
});
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} routes={routes}/>,
  document.getElementById('react-content')
);
