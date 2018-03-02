import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import 'antd/lib/style/v2-compatible-reset';
import '../assets/css/common/index.less';
import './MainLayout.less';
import Header from './Header';
import Notice from './Notice';
import { getDynamicCls } from '../utils';
import { DEFAULT_MENU, DEFAULT_MENU_ICON, LOCAL_SIDEBAR_COLLAPSED } from '../constants';
const { Content, Sider } = Layout;

class MainLayout extends Component {
  static propTypes = {
    isCheckLogin: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    menu: PropTypes.string,
    breadcrumb: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props);
    const collapsed = false;
    this.state = {
      collapsed,
    };
    this.toggle = this.toggle.bind(this);
    this.getMenu = this.getMenu.bind(this);
  }

  toggle() {
    const collapsed = !this.state.collapsed;
    this.setState({
      collapsed,
    });
  }

  // 菜单从页面同步数据获取，前端不做菜单权限判断
  getMenu() {
    const current = this.props.menu;
    let menu = window.setting && window.setting.app && window.setting.app.menu || DEFAULT_MENU;
    menu = menu.map((item) => {
      const icon = DEFAULT_MENU_ICON[item.key];
      if (typeof icon != 'undefined') {
        item.icon = icon;
      } else {
        item.icon = '';
      }
      return item;
    });
    return (
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[current]}
      >
        {
          menu.map((item) => {
            return (
              <Menu.Item key={item.key}>
                <a href={item.url}>
                  <i className={`iconfont menu-icon ${item.icon}`} />
                  <span className="nav-text">{item.text}</span>
                </a>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }
  render() {
    const { children, isCheckLogin, className, breadcrumb } = this.props;

    return (
      <div className="g-main-layout">
        <Notice />
        <Layout>
          <Sider
            className="g-main-layout-sider"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            width={160}
          >
            <div className="logo-wrap">
              <span className="logo" href="javascript:;">
                网易先知
              </span>
            </div>
            {this.getMenu()}
          </Sider>
          <Layout className="g-main-layout-container">
            <div
              className="g-main-layout-container-header"
            >
              <Header isCheckLogin={isCheckLogin} breadcrumb={breadcrumb} />
            </div>
            <Content className={getDynamicCls('g-main-layout-content', className, () => {return !!className;})}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
