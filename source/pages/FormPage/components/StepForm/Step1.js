import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';
import { Form, Input, Button, Select, Divider } from 'ppfish';
import { browserHistory } from 'react-router';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          browserHistory.push('/formPage/step/step2/');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" hideRequiredMark>
          <Form.Item {...formItemLayout} label="付款账户">
            {getFieldDecorator('payAccount', {
              rules: [{ required: true, message: '请选择付款账户' }],
            })(
              <Select placeholder="test@example.com" style={{ height: 36 }}>
                <Option value="ant-design@alipay.com">xxx.com</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款账户">
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100, height: 36 }}>
                <Option value="alipay">账号</Option>
                <Option value="bank">银行账户</Option>
              </Select>
              {getFieldDecorator('receiverAccount', {
                rules: [
                  { required: true, message: '请输入收款人账户' },
                  { type: 'email', message: '账户名应为邮箱格式' },
                ],
              })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款人姓名">
            {getFieldDecorator('receiverName', {
              rules: [{ required: true, message: '请输入收款人姓名' }],
            })(<Input placeholder="请输入收款人姓名" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="转账金额">
            {getFieldDecorator('amount', {
              rules: [
                { required: true, message: '请输入转账金额' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ],
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div>
          <h3>说明</h3>
          <h4>转账到xxx</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({},
    bindActionCreators(actions, dispatch),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  onFieldsChange(props, changedFields) {
    props.setForm(changedFields);
  },
  mapPropsToFields(props) {
    const { step1 } = props.stepForm;
    return {
      payAccount: Form.createFormField({
        ...step1.payAccount,
        value: step1.payAccount.value,
      }),
      receiverAccount: Form.createFormField({
        ...step1.receiverAccount,
        value: step1.receiverAccount.value,
      }),
      receiverName: Form.createFormField({
        ...step1.receiverName,
        value: step1.receiverName.value,
      }),
      amount: Form.createFormField({
        ...step1.amount,
        value: step1.amount.value,
      })
    };
  }
}
)(Step1));
