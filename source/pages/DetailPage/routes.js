import React from 'react';
import { Route, IndexRoute } from 'react-router';
import DetailPage from './view';
import AdvancedDetail from './components/AdvancedDetail/';
import BasicDetail from './components/BasicDetail/';
export default (
 
  <Route path="detailPage/" component={DetailPage}>
    <IndexRoute component={BasicDetail}/>
    <Route path="basic/" component={BasicDetail} />
    <Route path="advanced/" component={AdvancedDetail} />
  </Route>
);
