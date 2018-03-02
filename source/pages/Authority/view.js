import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';

import Authority from './Authority';

const mapStateToProps = (state) => {
  return {
    ...state.header,
    ...state.Authority
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Authority);
