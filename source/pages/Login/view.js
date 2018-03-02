import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { setLoginResult, loadLogin } from '../../actions/actions';

const mapStateToProps = (state) => {
  return {
    ...state.header,
    ...state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadLogin: (success) => {
      dispatch(loadLogin(success));
    },
    onError: (errMesg) => {
      dispatch(setLoginResult(!!errMesg, errMesg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
