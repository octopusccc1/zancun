import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { loadLogout } from '../actions/actions';
import { redirectLogin } from '../utils';
import { Row, Col, Breadcrumb, Popover } from 'antd';
import config from '../config';

import './Header.less';

class Header extends Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isCheckLogin: PropTypes.bool.isRequired,
    breadcrumb: PropTypes.arrayOf(PropTypes.object),
    onLoadLogout: PropTypes.func,
    role: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.onLoadLogout = props.onLoadLogout.bind(this);
  }

  componentWillMount() {
    const {isCheckLogin, isAuthenticated} = this.props;
    // 是否需要检查用户登录状态
    if (isCheckLogin && !isAuthenticated) {
      // 未登录用户跳转到首页登录框，生产环境依赖服务端判断使用302跳转到登录页面
      if (config.useFrontCookie && !isAuthenticated) {
        redirectLogin();
      }
    }
    // 判断用户已登录
    if (isAuthenticated) {
      // 为登录后获取用户信息预留功能
    }
  }

  // 左侧头部
  getHeaderLeft() {
    const {breadcrumb} = this.props;
    const breadcrumbItems = breadcrumb && breadcrumb.map((e, idx) => {
      const itemProps = {
        key: idx,
      };
      if (e.href) itemProps.href = e.href;
      return (
        <Breadcrumb.Item {...itemProps} key={idx}>
          {e.text}
        </Breadcrumb.Item>
      );
    });
    return (
      <div className="clearfix g-header-l">
        {breadcrumb &&
        <Breadcrumb separator=">">
          {breadcrumbItems}
        </Breadcrumb>
        }
      </div>
    );
  }

  // 右侧头部
  getHeaderRight() {
    const {isCheckLogin, name, isAuthenticated, role} = this.props;
    const hoverContent = (
      <div className="g-header-tooltip-more">
        <div className="more-item more-setting">
          <a href="/setting/">个人信息设置</a>
        </div>
        <div className="more-item">
          <a href="javascript:;" onClick={this.onLoadLogout}>
            <span>退出</span>
          </a>
        </div>
      </div>
    );
    // 未登录，预留给注册使用
    if (!isAuthenticated) {
      // do nothing
    }
    const ellipsisName = name && name.length > 10 ? name.slice(0, 10) + '...' : name;

    return (
      <ul className="clearfix g-header-r">
        <li className="g-header-r-item g-header-r-name">
          <Popover
            trigger="click"
            content={hoverContent}
            overlayClassName="g-header-r-popover"
            placement="bottom"
          >
            <span className="nickname">
              Hi,{ellipsisName}
            </span>
            <span className="more">
              <i className="iconfont icon-xiajiantou" />
            </span>
          </Popover>
        </li>
        <li className="g-header-r-item">
          <div className="separator" />
        </li>
        {role === 3 ? null :
          <li className="g-header-r-item">
            <div className="clearfix icon-setting">
              <a href="/authority/">
                <i className="iconfont icon-shezhi" />
              </a>
            </div>
          </li>
        }
      </ul>
    );
  }

  render() {
    const {children} = this.props;
    return (
      <div className="g-header">
        {children}
        <div className="g-header-bd clearfix" id="header">
          <Row>
            <Col span={12}>
              {this.getHeaderLeft()}
            </Col>
            <Col span={12}>
              {this.getHeaderRight()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.header,
    ...state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadLogout: () => {
      dispatch(loadLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
