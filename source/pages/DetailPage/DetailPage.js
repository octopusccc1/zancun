import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../MainLayout';
import { menu } from '../../constants';
import { Button, BackTop, Col } from 'antd';
import { Spin, Table, Divider, Icon, Modal } from 'ppfish';
import './DetailPage.less';


class App extends Component {
  constructor(props) {
    super(props);
    // 设置面包屑
    this.breadcrumb = [{
      text: '详情页'
    }];
  }
  handleChangeTitle = ()=>{
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 2]) {
      case 'basic':
        return '基础详情页';
      case 'advanced':
        return '高级详情页';
      default:
        return '基础详情页';
    }
  }
  render() {
    return (
      <MainLayout isCheckLogin={true} menu={menu.LANDING} breadcrumb={this.breadcrumb}>
        <div className="g-detail">
          <div className="u-detail-hd">
            <div className="detail-hd-left">
              <h3 className="detail-hd-title">{this.handleChangeTitle()}</h3>
            </div>
            <div className="detail-hd-right"></div>
          </div>
          <div className="u-detail-content">
            {this.props.children}
          </div>
        </div>

      </MainLayout>
    );
  }
}

export default App;

