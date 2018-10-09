import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../../../MainLayout';
import { menu } from '../../../../constants';
import { Form, Select, AutoComplete, Input, Tooltip, Icon, Cascader, Row, Checkbox, Col, Button, Divider, Card, RangePicker } from 'ppfish';
import './AdvancedForm.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};
class App extends Component {
  constructor(props) {
    super(props);
    // 设置面包屑
    this.breadcrumb = [{
      text: '表单页'
    }];
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        // dispatch({
        //   type: 'form/submitAdvancedForm',
        //   payload: values,
        // });
        console.log(values)
      }
    });
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password3')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 80 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <MainLayout isCheckLogin={true} menu={menu.LANDING} breadcrumb={this.breadcrumb}>
        <div className="g-advanced">
          {/* <div className="u-card">
            <div className="u-title">
              <h3 className="title-text">仓库管理</h3>
              <Divider style={{ marginTop: 16 }} dashed/>
            </div>
            <div className="u-content">
                <Row gutter={18}>
                  <Col span={8}>
                    <div className="u-item">
                      <div className="item-text">仓库名</div>
                      <Input 
                        size="small"
                        type="text"
                        placeholder="请输入仓库名称"
                        style={{ width: 216 }}/>
                    </div>
                  </Col>
                  <Col span={8}>
                  <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="请输入"
                    />
                  </Col>
                  <Col span={8}>3</Col>
                </Row>
            </div>
          </div> */}
          <Card title="仓库管理" bordered={false}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={"仓库名称"}>
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入仓库名称' }],
                    })(
                      <Input placeholder="请输入仓库名称" />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={"地址"}>
                    {getFieldDecorator('url', {
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Input
                        style={{ width: '100%' }}
                        addonBefore="http://"
                        addonAfter=".com"
                        placeholder="请输入"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={"管理员"}>
                    {getFieldDecorator('owner', {
                      rules: [{ required: true, message: '请选择管理员' }],
                    })(
                      <Select placeholder="请选择管理员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={"审批员"}>
                    {getFieldDecorator('approver', {
                      rules: [{ required: true, message: '请选择审批员' }],
                    })(
                      <Select placeholder="请选择审批员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={"仓库类型"}>
                    {getFieldDecorator('type', {
                      rules: [{ required: true, message: '请选择仓库类型' }],
                    })(
                      <Select placeholder="请选择仓库类型">
                        <Option value="private">私密</Option>
                        <Option value="public">公开</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title="任务管理" bordered={false} style={{marginTop:24}}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.name2}>
                    {getFieldDecorator('name2', {
                      rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.url2}>
                    {getFieldDecorator('url2', {
                      rules: [{ required: true, message: '请选择' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.owner2}>
                    {getFieldDecorator('owner2', {
                      rules: [{ required: true, message: '请选择管理员' }],
                    })(
                      <Select placeholder="请选择管理员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.approver2}>
                    {getFieldDecorator('approver2', {
                      rules: [{ required: true, message: '请选择审批员' }],
                    })(
                      <Select placeholder="请选择审批员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.type2}>
                    {getFieldDecorator('type2', {
                      rules: [{ required: true, message: '请选择仓库类型' }],
                    })(
                      <Select placeholder="请选择仓库类型">
                        <Option value="private">私密</Option>
                        <Option value="public">公开</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Button type="primary" style={{ float: "right",marginTop:20 }} onClick={this.validate}>
            提交
          </Button>
        </div>
       
      </MainLayout>
    );
  }
}
const Demo = Form.create()(App);
export default Demo;

