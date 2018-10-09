import { connect } from 'react-redux';
import AdvancedDetail from './AdvancedDetail';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  console.log(state)
  return {
    ...state.advancedDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedDetail);
