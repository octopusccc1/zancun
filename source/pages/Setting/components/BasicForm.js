import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setName } from '../../../actions/actions';
import { Form, Input, Button, message } from 'antd';
import { request } from '../../../utils';
import { MAX_NAME_LEN, MAX_DESC_LEN } from '../../../constants';
import './BasicForm.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
const formTailLayout = {
  wrapperCol: { span: 17, offset: 7 },
};

class BasicForm extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    account: PropTypes.string,
    name: PropTypes.string,
    onSave: PropTypes.func,
  }

  constructor(props) {
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
          url: '/api/prophet/user/profile/update',
          method: 'PATCH',
          data: {
              realName: values.name
          },
        }).then(
          (json) => {
              message.success('保存成功');
              this.props.onSave(values.name);
              this.props.form.resetFields();
          },
          (json) => {
              message.error('保存失败');
          }
        ).then(()=>{
          this.setState({
            loading: false
          });
        });
      },
    );
  }

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;

    return (
      <form className="m-basic-form" method="post" onSubmit={this.save}>
        <FormItem {...formItemLayout} label="账号">
          <span className="ant-form-text">{this.props.account}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue: this.props.name,
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入姓名',
            }],
          })(
            <Input placeholder="姓名" maxLength={MAX_NAME_LEN} autoComplete="off"/>
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

const WrappedBasicForm = Form.create()(BasicForm);

const mapStateToProps = (state) => {
  return {
    account: state.header.account,
    name: state.header.name,
  };
};
const mapDispatchToProps = {
  onSave: setName
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedBasicForm);
