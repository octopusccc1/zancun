import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'ppfish';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

class Step3 extends React.PureComponent {
  render() {
    console.log(this.props)
    const onFinish = () => {
      browserHistory.push('/formPage/step/');
    };
    const information = (
      <div>
        <Row>
          <Col xs={24} sm={8}>
            付款账户：
          </Col>
          <Col xs={24} sm={16}>

          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>

          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8}>
            收款人姓名：
          </Col>
          <Col xs={24} sm={16}>

          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8}>
            转账金额：
          </Col>
          <Col xs={24} sm={16}>

          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          再转一笔
        </Button>
        <Button>查看账单</Button>
      </Fragment>
    );
    return (
      <Fragment>
        <div style={{textAlign:"center"}}>操作成功</div>
        {actions}
      </Fragment>


    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
