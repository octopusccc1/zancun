import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Modal} from 'antd';
import './DeveloperID.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;

class App extends Component {

  static propTypes = {
    appKey: PropTypes.string,
    appSecret: PropTypes.string,
    initAppInfo: PropTypes.func,
    resetAppSecret: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.props.initAppInfo();
  }

  resetAppSecret = () => {
    const {resetAppSecret} = this.props;
    confirm({
      title: '重置后立即生效，所有使用旧AppSecret的接口将失效，确认重置?',
      onOk() {
        resetAppSecret();
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {offset: 1, span: 19},
    };
    const {appKey, appSecret} = this.props;
    return (
      <div className="m-developer">
        <p className="u-developer-describe">
          利用AppKey和AppSecret完成数据校验后，可通过API导入第一方ID构建客群。
        </p>
        <Form className="u-developer-form">
          <FormItem label="AppKey" {...formItemLayout}>
            <span className="u-appinfo">{appKey}</span>
          </FormItem>
          <FormItem label="AppSecret" {...formItemLayout}>
            <span className="u-appinfo">{appSecret}</span>
            <a className="u-reset-btn" onClick={this.resetAppSecret}>重置</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedForm = Form.create()(App);
export default WrappedForm;

