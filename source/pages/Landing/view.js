import React, {Component} from 'react';
import {connect} from 'react-redux';
import Landing from './Landing';
import {bindActionCreators} from 'redux';
import * as actions from './actions';

const mapStateToProps = (state) => {
  return {
    ...state.landing
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
