import { connect } from 'react-redux';
import BasicDetail from './BasicDetail';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  return {
    ...state.basicDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetail);
