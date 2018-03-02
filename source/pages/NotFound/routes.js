import React from 'react';
import { Route, IndexRoute } from 'react-router';
import NotFound from './view';

export default (
  <Route path="*" component={NotFound} />
);
