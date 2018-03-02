import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './CreateAccountModal.less';
import {Form, Modal, Input, Select, Button} from 'antd';
import {MAX_USERNAME_LEN, MAX_ACCOUNT_LEN, ROLE_MAP, MIN_PWD_LEN, MAX_PWD_LEN} from '../../../constants';
import {deepTrim, generateAuthPassword} from '../../../utils';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 4, offset: 2, pull: 1},
  wrapperCol: {span: 18, pull: 1}
};

class CreateAccountModal extends Component {

  static propTypes = {
    form: PropTypes.object,
    handleCreateAccount: PropTypes.func,
    handleCreateCancel: PropTypes.func,
    role: PropTypes.number,
    visible: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  handleCreate = () => {
    const {handleCreateAccount} = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //md5
      values.password = generateAuthPassword(values.password);
      //trim
      deepTrim(values);
      //reset
      handleCreateAccount(values, () => {
        this.props.form.resetFields();
      });
    });
  };

  handleCancel = () => {
    this.props.form.resetFields();
    const {handleCreateCancel} = this.props;
    handleCreateCancel();
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal
        visible={this.props.visible}
        wrapClassName="u-account-modal"
        title="创建账号"
        okText="保存"
        maskClosable={false}
        onCancel={this.handleCancel}
        onOk={this.handleCreate}
        footer={
          <div>
            <Button key="back" onClick={this.handleCancel} className="u-btn-normal" size="large">
              取消
            </Button>
            <Button key="submit" onClick={this.handleCreate} className="u-btn-normal" type="primary" size="large">
              保存
            </Button>
          </div>
        }
      >
        <Form>
          <FormItem label="账号"
                    {...formItemLayout}
          >
            {getFieldDecorator('account', {
              initialValue: '',
              rules: [
                {required: true, whitespace: true, pattern: /^[A-Za-z0-9]+$/, message: '请输入数字或字母'},
                {max: +MAX_ACCOUNT_LEN, message: `账号最多${MAX_ACCOUNT_LEN}个字符`}
              ]
            })(
              <Input placeholder="请输入数字或字母" maxLength={MAX_ACCOUNT_LEN} autoComplete="off"/>
            )}
          </FormItem>
          <FormItem label="用户名"
                    {...formItemLayout}
          >
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [
                {required: true, whitespace: true, message: '请输入用户名'},
                {max: +MAX_USERNAME_LEN, message: `用户名最多${MAX_USERNAME_LEN}个字符`}
              ]
            })(
              <Input maxLength={MAX_USERNAME_LEN} autoComplete="off"/>
            )}
          </FormItem>
          <FormItem label="权限"
                    {...formItemLayout}
          >
            {getFieldDecorator('role', {
              initialValue: '3',
              rules: [
                {required: true, message: '请选择权限'}
              ]
            })(
              <Select
                style={{width: '100%'}}>
                {
                  Object.keys(ROLE_MAP)
                    .filter(mapRole => mapRole > this.props.role)
                    .map((mapRole) =>
                      <Select.Option value={mapRole} key={mapRole}>
                        {ROLE_MAP[mapRole]}
                      </Select.Option>)
                }
              </Select>
            )}
          </FormItem>
          <FormItem label="密码"
                    {...formItemLayout}
          >
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {max: +MAX_PWD_LEN, min: +MIN_PWD_LEN, message: `请输入${MIN_PWD_LEN}~${MAX_PWD_LEN}个字符`},
                {required: true, whitespace: true, message: '请输入密码'},
              ],
              validateTrigger: 'onBlur',
            })(<Input autoComplete="off"
                      maxLength={MAX_PWD_LEN}
                      minLength={MIN_PWD_LEN}
            />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({})(CreateAccountModal);
export default WrappedForm;
