import {connect} from 'react-redux';
import Center from './Center';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  return {
    ...state.center
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
