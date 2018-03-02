/* eslint-disable no-console */
import React, {Component} from 'react';
import './App.less';
import CustomerSaveModal from '../CustomerSaveModal';
import {Button} from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({visible: true});
  };

  handleCancel = () => {
    console.log('取消请求');
    this.setState({visible: false});
  };

  handleSuccess = () => {
    console.log('请求成功');
  };

  handleError = () => {
    console.log('请求失败');
  };


  render() {

    /**
     * customerId - 客群id
     * createType - 创建方式
     *  poi - POI客群
     *  tag - 标签客群
     *  customer_group - 基于已有客群
     * properties - 已选属性显示列表
     * name - 客群名称
     * description - 客群描述
     * quantity - 预测数字
     * customerGroupForm - 属性数组 详见NEI
     * visible - 模态框可见性
     * onSuccess - 保存成功回调
     * onError - 保存失败回调
     * onCancel - 取消模态框回调
     */
    return (
      <div>
        <CustomerSaveModal
          customerId={2}
          createType={'poi'}
          properties={['112312312312sadasdasdad3asdasdaass', 123122222231232, 3123123123, 4, 5, 6, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          name={'123'}
          quantity={33333}
          description={'1231231231'}
          customerGroupForm={[1, 2, 3]}
          visible={this.state.visible}
          onSuccess={this.handleSuccess}
          onError={this.handleError}
          onCancel={this.handleCancel}
        />
        <Button onClick={this.showModal}>保存客群</Button>
      </div>
    );
  }
}

export default App;
