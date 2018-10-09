import {connect} from 'react-redux';
import AbnormalPage from './AbnormalPage';
import {bindActionCreators} from 'redux';
import * as actions from './actions';

const mapStateToProps = (state) => {
  return {
    ...state.abnormalPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AbnormalPage);
