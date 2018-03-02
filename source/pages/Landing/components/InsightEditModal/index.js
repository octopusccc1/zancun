import React, {Component} from 'react';
import {Modal, Form, Input, Button} from 'antd';
import PropTypes from 'prop-types';
import {MAX_NAME_LEN, MAX_DESC_LEN} from '../../../../constants';

const FormItem = Form.Item;

class InsightEditModal extends Component {

  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onCreate: PropTypes.func,
    form: PropTypes.object,
    name: PropTypes.string,
    description: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {visible, onCancel, onCreate, name, description} = this.props;

    return (
      <Modal
        wrapClassName="u-edit-modal"
        visible={visible}
        maskClosable={false}
        title="编辑"
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
        footer={
          <div>
            <Button key="back" onClick={onCancel} className="u-btn-normal" size="large">
              取消
            </Button>
            <Button key="submit" onClick={onCreate} className="u-btn-normal" type="primary" size="large">
              保存
            </Button>
          </div>
        }
      >
        <Form>
          <FormItem label="洞察名称"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18, offset: 2}}
          >
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [
                {required: true, whitespace: true, message: '请输入洞察名称'},
                {max: +MAX_NAME_LEN, message: `洞察名称最多${MAX_NAME_LEN}个字符`}
              ]
            })(
              <Input placeholder="请输入洞察名称" maxLength={MAX_NAME_LEN} autoComplete="off"/>
            )}
          </FormItem>
          <FormItem label="洞察描述"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18, offset: 2}}
          >
            {getFieldDecorator('description', {
              initialValue: description,
              rules: [
                {max: +MAX_DESC_LEN, message: `洞察描述最多${MAX_DESC_LEN}个字符`}
              ]
            })(<Input.TextArea
                      placeholder="请输入洞察描述"
                      rows={4}
                      maxLength={MAX_DESC_LEN}
                      style={{resize: 'none'}}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({})(InsightEditModal);
export default WrappedForm;
