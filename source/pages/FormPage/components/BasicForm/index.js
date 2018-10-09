import {connect} from 'react-redux';
import BasicForm from './BasicForm';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  return {
    ...state.basicForm
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicForm);
