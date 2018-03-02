import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import { request, generateAuthPassword, s } from '../../../utils';
import { MIN_PWD_LEN, MAX_PWD_LEN } from '../../../constants';
import './PasswordForm.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
const formTailLayout = {
  wrapperCol: { span: 17, offset: 7 },
};

class PasswordForm extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
  }

  constructor(props){
    super(props);
    this.state={
      loading: false
    };
  }

  save = (e) => {
    e.preventDefault();
    this.props.form.validateFields(
      (err, values) => {
        if(err) return;

        this.setState({
          loading: true
        });

        request({
          method: 'PATCH',
          url: '/api/prophet/user/password/update',
          data: {
            oldPassword: generateAuthPassword(values.oldPassword),
            newPassword: generateAuthPassword(values.newPassword),
          },
        }).then(
          (json) => {
            message.success('密码修改成功');
          },
          (json) => {
            message.error(s('VALIDATE_OLD_PASSWORD_ERR'));
          }
        ).then(()=>{
          this.setState({
            loading: false
          });
        });
      },
    );
  };

  checkLength = (rule, value, callback)=>{
    if(value && value.length<MIN_PWD_LEN){
      callback(s('VALIDATE_PASSWORD_FORMAT_ERR',MIN_PWD_LEN,MAX_PWD_LEN));
    }
    else callback();
  };

  checkPassword = (rule, value, callback)=>{
    const form = this.props.form;
    const newPassword = form.getFieldValue('newPassword');
    callback();
    if(value && newPassword){
      form.validateFields(['newPassword'], {force:true});
    }
  };

  checkNewPassword = (rule, value, callback)=>{
    const form = this.props.form;
    const oldPassword = form.getFieldValue('oldPassword');
    const confirmNewPassword = form.getFieldValue('confirmNewPassword');
    if(value && value == oldPassword){
      callback(s('VALIDATE_NEW_PASSWORD_SAME_ERR'));
    }
    else {
      callback();
    }
    if(value && confirmNewPassword){
      form.validateFields(['confirmNewPassword'], {force:true});
    }
  };

  checkConfirm = (rule, value, callback)=>{
    const form = this.props.form;
    const newPassword = form.getFieldValue('newPassword');
    if(value && value != newPassword){
      callback(s('VALIDATE_NEW_PASSWORD_INCONSISTANT_ERR'));
    }
    else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    const oldPwdError = getFieldError('oldPassword');
    const newPwdError = getFieldError('newPassword');
    const confirmNewPwdError = getFieldError('confirmNewPassword');

    return (
      <form className="m-password-form" method="post" onSubmit={this.save}>
        <FormItem {...formItemLayout} label="原密码"
          help={oldPwdError?oldPwdError[0]:''}
        >
          {getFieldDecorator('oldPassword', {
            rules: [{
              required: true,
              whitespace: true,
              message: s('VALIDATE_PASSWORD_FORMAT_ERR',MIN_PWD_LEN,MAX_PWD_LEN),
            },{
              validator: this.checkLength
            },{
              validator: this.checkPassword
            }],
          })(
            <Input type="password" maxLength={MAX_PWD_LEN}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="新密码"
          help={newPwdError?newPwdError[0]:''}
        >
          {getFieldDecorator('newPassword', {
            rules: [{
              required: true,
              whitespace: true,
              message: s('VALIDATE_PASSWORD_FORMAT_ERR',MIN_PWD_LEN,MAX_PWD_LEN),
            },{
              validator: this.checkLength
            },{
              validator: this.checkNewPassword
            }],
          })(
            <Input type="password" placeholder={s('PLACEHOLDER_NEW_PASSWORD',MIN_PWD_LEN,MAX_PWD_LEN)}
              maxLength={MAX_PWD_LEN}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="确认新密码"
          help={confirmNewPwdError?confirmNewPwdError[0]:''}
        >
          {getFieldDecorator('confirmNewPassword', {
            rules: [{
              required: true,
              whitespace: true,
              message: s('VALIDATE_PASSWORD_FORMAT_ERR',MIN_PWD_LEN,MAX_PWD_LEN),
            },{
              validator: this.checkLength
            },{
              validator: this.checkConfirm
            }],
          })(
            <Input type="password" placeholder="再次输入密码" maxLength={MAX_PWD_LEN}/>
          )}
        </FormItem>
        <FormItem {...formTailLayout}>
          <Button htmlType="submit"
            className="save-btn" loading={this.state.loading}>保存</Button>
        </FormItem>
      </form>
    );
  }
}

const WrappedForm = Form.create()(PasswordForm);

export default WrappedForm;
