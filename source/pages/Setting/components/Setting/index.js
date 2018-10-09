import {connect} from 'react-redux';
import Setting from './Setting';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  return {
    ...state.setting
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
