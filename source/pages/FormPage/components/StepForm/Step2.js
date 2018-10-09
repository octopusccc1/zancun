import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Alert, Divider } from 'ppfish';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
class Step2 extends React.PureComponent {
  render() {
    const { form, submitting, stepForm } = this.props;
    const { getFieldDecorator, validateFields } = form;
    console.log(this.props)
    const onPrev = () => {
      browserHistory.push('/formPage/step/step1/');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          browserHistory.push('/formPage/step/step3/');
        }
      });
    };
    return (
      <Form layout="horizontal" >
        <Alert
          closable
          showIcon
          message="确认转账后，资金将直接打入对方账户，无法退回。"
          style={{ marginBottom: 24 }}
        />
        <Form.Item {...formItemLayout} label="付款账户">
          {stepForm.step1.payAccount.value}
        </Form.Item>
        <Form.Item {...formItemLayout} label="收款账户">
          {stepForm.step1.receiverAccount.value}
        </Form.Item>
        <Form.Item {...formItemLayout} label="收款人姓名">
          {stepForm.step1.receiverName.value}
        </Form.Item>
        <Form.Item {...formItemLayout} label="转账金额">
          {stepForm.step1.amount.value}
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="支付密码" required={false}>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [
              {
                required: true,
                message: '需要支付密码才能进行支付',
              },
            ],
          })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Step2));
