import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Form, Input, Button, Checkbox, Tooltip } from 'antd';
import Notice from '../Notice';
import '../../assets/css/common/index.less';
import './Login.less';
import { getConfig } from '../../config';
import { MAX_PASSWORD_LEN } from '../../constants';
const url = getConfig().url;
const createForm = Form.create;
const FormItem = Form.Item;
const onFieldsChange = (props, fields) => {
  if (typeof fields.password != 'undefined') {
    props.fields.password = fields.password.value;
  }
  if (typeof fields.username != 'undefined') {
    props.fields.username = fields.username.value;
  }
  if (typeof fields.remember != 'undefined') {
    props.fields.remember = fields.remember.value;
  }
};
const mapPropsToFields = (props) => {
  return {
    username: Form.createFormField({
      value: props.fields.username,
    }),
    password: Form.createFormField({
      value: props.fields.password,
    }),
    remember: Form.createFormField({
      value: props.fields.remember,
    }),
  };
};
const LoginForm = createForm({
  onFieldsChange,
  mapPropsToFields,
})(props => {
  const { getFieldDecorator, getFieldError, isFieldValidating } = props.form;
  const { isLoginErrorVisible, loginErrorText, validUsername, validPassword, handleSubmit } = props;
  const formItemLayout = {};
  return (
    <Form layout="horizontal">
      <FormItem
        {...formItemLayout}
        help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(', ')}
        prefixCls="username"
      >
        {getFieldDecorator('username', {
          rules: [
            { validator: validUsername },
          ],
          validateTrigger: 'onBlur',
        })(
          <Input
            type="text"
            placeholder="账号"
            autoComplete="off"
          />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        prefixCls="password"
      >
        {getFieldDecorator('password', {
          rules: [
            { validator: validPassword },
          ],
          validateTrigger: 'onBlur',
        })(
          <Input
            type="password"
            placeholder="密码"
            autoComplete="off"
            maxLength={MAX_PASSWORD_LEN}
            onPressEnter={handleSubmit}
          />
        )}
      </FormItem>
      <FormItem
        prefixCls="login"
      >
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: props.fields.remember,
        })(
          <Checkbox>记住密码</Checkbox>
        )}

        <Tooltip title="请联系管理员" placement="bottom">
          <a className="login-form-forgot" href="javascript:;">忘记密码</a>
        </Tooltip>
        <Button type="primary" className="login-btn" onClick={handleSubmit}>登录</Button>
      </FormItem>
      <div className="login-result" style={{display: isLoginErrorVisible ? 'block' : 'none'}}>{loginErrorText}</div>
    </Form>
  );
});
class App extends Component {
  static propTypes = {
    fields: PropTypes.object,
    isLoginErrorVisible: PropTypes.bool,
    loginErrorText: PropTypes.string,
    onLoadLogin: PropTypes.func,
    onError: PropTypes.func,
  };

  static defaultProps = {
    isLoginErrorVisible: false,
    loginErrorText: '',
    onError: () => {},
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectAfterLogin = this.redirectAfterLogin.bind(this);
    this.validUsername = this.validUsername.bind(this);
    this.validPassword = this.validPassword.bind(this);
  }

  componentDidMount() {
    const { onError } = this.props;
    const search = queryString.parse(location.search);
    onError(search.errorMsg);
  }

  // 登录成功后跳landing page
  redirectAfterLogin() {
    location.replace(url.landing);
  }

  handleSubmit() {
    const login = this.refs.loginForm;
    const { onLoadLogin } = login.props;
    const form = login.getForm();
    const { validateFields, getFieldValue } = form;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      onLoadLogin(() => {
        this.redirectAfterLogin();
      });
    });

  }

  validUsername(rule, value, callback) {
    const { onError } = this.props;
    let errMesg;
    value = value && value.trim();
    if (!value) {
      errMesg = '账号不能为空';
      callback([new Error(errMesg)]);
      // onError(errMesg);
    // 预留，校验账号
    } else {
      // if (!/\d{11}/.test(value)) {
      //   errMesg = '请输入正确的账号';
      //   callback([new Error(errMesg)]);
      //   onError(errMesg);
      // }
    }
    callback();
  }

  validPassword(rule, value, callback) {
    const { onError } = this.props;
    let errMesg;
    // 1.0版本确认空格作为密码字符，不需要trim
    // value = value && value.trim();
    if (!value) {
      errMesg = '请输入密码';
      callback([new Error(errMesg)]);
      // onError(errMesg);
    }
    callback();
  }

  render() {
    return (
      <div className="ant-row login-container">
        <Notice />
        <div className="login-wrap">
          <div className="title">
            <i className="iconfont icon-expressionicon logo" />
            <span className="name">Prophet</span>
          </div>
          <LoginForm
            ref="loginForm"
            {...this.props}
            validUsername={this.validUsername}
            validPassword={this.validPassword}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default App;
