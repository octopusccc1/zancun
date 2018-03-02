import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Button, Input, Tooltip} from 'antd';
import {customerType} from '../../../constants';
import {request, deepTrim} from "../../../utils";
import './CustomerSaveModal.less';

const FormItem = Form.Item;

class CustomerSaveModal extends Component {

  static propTypes = {
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onCancel: PropTypes.func,
    visible: PropTypes.bool,
    createType: PropTypes.string,
    quantity: PropTypes.number,
    customerId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    properties: PropTypes.array,
    name: PropTypes.string,
    description: PropTypes.string,
    customerGroupForm: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    form: PropTypes.object
  };

  static defaultProps = {
    visible: false,
    createType: '',
    customerId: 0,
    quantity: 0,
    properties: [],
    name: '',
    description: '',
    customerGroupForm: {}
  };

  constructor(props) {
    super(props);
  }

  onCancel = () => {
    const {onCancel} = this.props;
    onCancel && onCancel();
  };

  onSave = (isSaveAs = false) => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      deepTrim(values);
      const {customerId, createType, onSuccess, onError, quantity, customerGroupForm} = this.props;
      let ajaxUrl = '';
      if (createType === customerType.CUSTOMER_GROUP) {
        ajaxUrl = '/api/prophet/customer_group/create';
      } else {
        ajaxUrl = `/api/prophet/${createType}/customer_group/save`;
      }
      const form = {
        ...values,
        quantity,
        customerGroupForm,
      };
      //保存并有ID
      if (!isSaveAs && customerId) {
        form.id = customerId;
      }
      request({
        url: ajaxUrl,
        method: 'POST',
        data: form,
      }).then(
        (json) => {
          this.props.form.resetFields();
          onSuccess && onSuccess({
            ...values,
            customerId: json.result
          });
        },
        (json) => {
          onError && onError(json);
        }
      );
    });
  };

  render() {
    const {visible, customerId, properties, name, description} = this.props;
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal
        wrapClassName="u-customer-modal"
        visible={visible}
        title="保存客群"
        okText="保存"
        maskClosable={false}
        onCancel={this.onCancel}
        onOk={this.onSave}
        footer={
          <div>
            <Button key="back" onClick={this.onCancel}
                    className="u-btn-normal"
                    size="large">
              取消
            </Button>
            <Button key="submit"
                    onClick={() => this.onSave(false)}
                    className="u-btn-normal"
                    type="primary"
                    ghost
                    size="large">
              保存
            </Button>
            {!!customerId &&
            <Button key="submitAs"
                    onClick={() => this.onSave(true)}
                    className="u-btn-large"
                    type="primary"
                    ghost
                    size="large">
              另存为
            </Button>
            }
          </div>
        }
      >
        <Form>
          <FormItem label="客群名称"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18, offset: 2}}
          >
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [
                {required: true, whitespace: true, message: '请输入客群名称'},
                {max: 30, message: '客群名称最多30个字符'}
              ]
            })(
              <Input placeholder="请输入客群名称" maxLength="30" autoComplete="off"/>
            )}
          </FormItem>
          <FormItem label="客群描述"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18, offset: 2}}
          >
            {getFieldDecorator('description', {
              initialValue: description,
              rules: [
                {max: 100, message: '客群描述最多100个字符'}
              ]
            })(
              <Input type="textarea"
                     placeholder="请输入客群描述"
                     rows={4}
                     maxLength="100"
                     style={{resize: 'none'}}/>
            )}
          </FormItem>
          <FormItem label="已选属性"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18, offset: 2}}
          >
            <div>
              <div className="u-list-tlt">
                <p>
                  客群属性
                  <span className="u-list-num"> ( {properties && properties.length} )</span>
                </p>
              </div>
              <ul className="u-list-bd">
                {properties.map((item, index) =>
                  <li key={`property-${index}`} className="u-list-item">
                    <p className="u-item">
                      <Tooltip placement="bottom" title={item}>
                        <span className="u-item-span">{item}</span>
                      </Tooltip>
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({})(CustomerSaveModal);
export default WrappedForm;
