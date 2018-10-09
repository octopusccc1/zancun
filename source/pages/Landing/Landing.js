import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Landing.less';
import MainLayout from '../MainLayout';
import InsightItem from './components/InsightItem';
import { menu } from '../../constants';
import { Button, BackTop, Col } from 'antd';
import { Spin, Table, Divider, Icon, Modal } from 'ppfish';
import empty from '../../assets/image/empty@2x.png';

class App extends Component {
  constructor(props) {
    super(props);
    // 设置面包屑
    this.breadcrumb = [{
      text: '列表页'
    }];
    this.state = {
      visible: false
    }
  }
  handleModal = () => {
    this.setState({
      visible: true
    })
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  confirm = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
    });
  }
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '15%',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
    }, {
      title: 'Action',
      key: 'action',
      width: '40%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.handleModal}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Divider type="vertical" />
          <a href="javascript:;" className="fishd-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },{
      key: '4',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },{
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },{
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },{
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
    return (
      <MainLayout isCheckLogin={true} menu={menu.LANDING} breadcrumb={this.breadcrumb}>

        <div className="m-insight-landing">
          <div className="u-landing-hd">
            <div className="landing-hd-left">
              <h3 className="landing-hd-title">列表</h3>
            </div>
            <div className="landing-hd-right"></div>
          </div>
          <Modal
            title="Modal"
            visible={this.state.visible}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="确认"
            cancelText="取消"
          >
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
          </Modal>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 'calc( 100vh - 313px )' }}
          />
        </div>
      </MainLayout>
    );
  }
}

export default App;

