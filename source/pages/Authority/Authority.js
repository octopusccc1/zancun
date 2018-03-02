import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Authority.less';
import MainLayout from '../MainLayout';
import {Button, Tabs} from 'antd';
import AuthorityTable from './components/AuthorityTable';
import CreateAccountModal from './components/CreateAccountModal';
import DeveloperID from './components/DeveloperID';

const TabPane = Tabs.TabPane;

class Authority extends Component {

  static propTypes = {
    role: PropTypes.number,
    authority: PropTypes.shape({
      totalNum: PropTypes.number,
      list: PropTypes.array,
      isListLoading: PropTypes.bool,
      current: PropTypes.number
    }),
    developerID: PropTypes.shape({
      appKey: PropTypes.string,
      appSecret: PropTypes.string,
    }),
    createAccount: PropTypes.func,
    getAuthorityList: PropTypes.func,
    resetPassword: PropTypes.func,
    deleteAccount: PropTypes.func,
    changeAccountType: PropTypes.func,
    setCurrent: PropTypes.func,
    initAppInfo: PropTypes.func,
    resetAppSecret: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showCreateAccountModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCreateAccount = (form, success) => {
    const {createAccount, getAuthorityList} = this.props;
    const {current} = this.props.authority;
    createAccount(form, () => {
      this.setState({
        visible: false
      });
      getAuthorityList(current);
      success && success();
    });
  };

  handleCreateCancel = () => {
    this.setState({
      visible: false
    });
  };

  pageHead = () => {
    return (
      <div className="page-hd" key="page-hd">
        <Button type="primary" className="u-btn-create" size="large" onClick={this.showCreateAccountModal}>
          创建账号
        </Button>
      </div>
    );
  };

  render() {
    const {
      role,
      resetPassword,
      deleteAccount,
      getAuthorityList,
      changeAccountType,
      setCurrent,
      initAppInfo,
      resetAppSecret
    } = this.props;
    const {
      isListLoading,
      list,
      totalNum,
      current,
    } = this.props.authority;
    const {
      appKey,
      appSecret,
    } = this.props.developerID;
    return (
      <MainLayout isCheckLogin={true}>
        <Tabs defaultActiveKey="1" className="m-authority">
          <TabPane tab="权限管理" key="1" className="page-authority">
            {this.pageHead()}
            <AuthorityTable
              key="authority-list"
              role={role}
              resetPassword={resetPassword}
              deleteAccount={deleteAccount}
              getAuthorityList={getAuthorityList}
              changeAccountType={changeAccountType}
              setCurrent={setCurrent}
              list={list}
              totalNum={totalNum}
              current={current}
              isListLoading={isListLoading}
            />
            <CreateAccountModal
              handleCreateAccount={this.handleCreateAccount}
              handleCreateCancel={this.handleCreateCancel}
              role={role}
              visible={this.state.visible}
            />
          </TabPane>
          <TabPane tab="开发者ID" key="2">
            <DeveloperID
              appKey={appKey}
              appSecret={appSecret}
              initAppInfo={initAppInfo}
              resetAppSecret={resetAppSecret}
            />
          </TabPane>
        </Tabs>
      </MainLayout>
    );
  }
}

export default Authority;

