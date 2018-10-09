import {connect} from 'react-redux';
import AdvancedForm from './AdvancedForm';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  return {
    ...state.advancedForm
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedForm);
