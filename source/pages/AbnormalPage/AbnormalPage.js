import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../MainLayout';
import { menu } from '../../constants';
import { Button, BackTop, Col } from 'antd';
import { Spin, Table, Divider, Icon, Modal } from 'ppfish';
import './AbnormalPage.less';


class App extends Component {
  constructor(props) {
    super(props);
    // 设置面包屑
    this.breadcrumb = [{
      text: '详情页'
    }];
  }

  render() {
    return (
      <MainLayout isCheckLogin={true} menu={menu.LANDING} breadcrumb={this.breadcrumb}>
        <div className="g-detail">
          <div className="u-detail-hd">
            <div className="detail-hd-left">
              <h3 className="detail-hd-title">详情页</h3>
            </div>
            <div className="detail-hd-right"></div>
          </div>
          <div className="u-detail-content">
            <div>退款申请</div>
          </div>
        </div>

      </MainLayout>
    );
  }
}

export default App;

