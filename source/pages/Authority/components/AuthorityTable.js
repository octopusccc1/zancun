import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Tooltip, Menu, Dropdown, Modal} from 'antd';
import './AuthorityTable.less';
import CustomTable from 'ppfish/source/components/CustomTable';
import {ROLE_MAP} from '../../../constants';
import {getTimeStamp} from '../../../utils';

const confirm = Modal.confirm;

class AuthorityTable extends Component {

  static propTypes = {
    current: PropTypes.number,
    resetPassword: PropTypes.func,
    deleteAccount: PropTypes.func,
    list: PropTypes.array,
    totalNum: PropTypes.number,
    setCurrent: PropTypes.func,
    getAuthorityList: PropTypes.func,
    isListLoading: PropTypes.bool,
    role: PropTypes.number,
    changeAccountType: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showId: 0,
      arrow: false
    };
    this.loadList(this.props.current);
  }

  componentWillReceiveProps(nextProps) {
    //页码改变,拉列表
    if (nextProps.current !== this.props.current) {
      this.loadList(nextProps.current);
    }
  }

  handleResetPassword = (id) => {
    const {resetPassword} = this.props;
    confirm({
      title: '确定要重置密码吗?',
      onOk() {
        resetPassword(id);
      }
    });
  };

  handleDeleteAccount = (id) => {
    const {deleteAccount, list, totalNum, setCurrent, current} = this.props;
    const that = this;
    confirm({
      title: '确定要删除该帐号吗?',
      onOk() {
        deleteAccount(id, () => {
          //删完了回上页
          if (list.length === 1 && totalNum !== 1) {
            setCurrent(current - 1);
          } else {
            that.loadList(current);
          }
        });
      }
    });
  };

  loadList = (current) => {
    const {getAuthorityList} = this.props;
    getAuthorityList(current);
  };

  handleChangeAccountType = (menuItem) => {
    const id = menuItem.item.props.id;
    const role = menuItem.key;

    const {changeAccountType} = this.props;
    changeAccountType(id, role);
  };

  handleTableChange = (pagination) => {
    this.props.setCurrent &&
    this.props.setCurrent(pagination.current);
  };

  render() {
    const {list, isListLoading,totalNum} = this.props;

    const columns = [
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
        className: 'name-column',
        render: (text) => {
          return (
            <Tooltip placement="bottom" title={text}>
              <p className="col-ell">
                {text}
              </p>
            </Tooltip>
          );
        }
      },
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        render: (text) => {
          return (
            <Tooltip placement="bottom" title={text}>
              <p className="col-ell">
                {text}
              </p>
            </Tooltip>
          );
        }
      },
      {
        title: '账号类型',
        dataIndex: 'role',
        width: '20%',
        key: 'role',
        render: (accountRole, record) => {
          const {role} = this.props;
          // 1、自己是超级管理员 2、权限小于自己 => 展示权限变更下拉栏
          const showDropMenu = role === 1 && accountRole > role;
          const menu = (
            <Menu onClick={this.handleChangeAccountType}>
              {
                Object.keys(ROLE_MAP)
                  .filter(mapRole => mapRole > role)
                  .map((mapRole) =>
                    <Menu.Item key={mapRole} id={record.id}>{
                      accountRole == mapRole ?
                        (<span className="u-active-menu-item">
                            {ROLE_MAP[mapRole]}
                            <i className="iconfont icon-duigou"/>
                          </span>
                        )
                        : ROLE_MAP[mapRole]
                    }</Menu.Item>
                  )
              }
            </Menu>
          );
          return (
            <p className="col-ell">
              {showDropMenu ? (
                  <Dropdown overlay={menu} trigger={['click']}
                            getPopupContainer={() => document.querySelector('.ant-table-body')}
                            onVisibleChange={(isArrowUp) => {
                              this.setState({
                                arrow: isArrowUp,
                                showId: record.id
                              });
                            }}>
                    <a className="ant-dropdown-link dropdown-link" href="#">
                      {ROLE_MAP[accountRole]}
                      <i
                        className={`
                        ${this.state.arrow && this.state.showId === record.id ? 'arrow-up' : ''}
                        icon-xiajiantou iconfont dropdown-icon`}/>
                    </a>
                  </Dropdown>
                ) :
                ROLE_MAP[accountRole]
              }
            </p>
          );
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '20%',
        render: (text) => {
          return (
            <p className="col-ell">
              {getTimeStamp(text)}
            </p>
          );
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: 100,
        render: (text, record) => {
          // 权限低于自己
          const showToolBar = this.props.role < record.role;
          const resetTab = classNames('iconfont', 'icon-zhongzhimima', {
            'disable-tab': !showToolBar,
            'edit-tab': showToolBar
          });
          const delTab = classNames('iconfont', 'icon-shanchu', {
            'disable-tab': !showToolBar,
            'edit-tab': showToolBar
          });
          return (
            <div className="u-operation">
              <Tooltip placement="bottom" title={'重置密码'}>
                <i onClick={() => showToolBar && this.handleResetPassword(record.id)}
                   className={resetTab}/>
              </Tooltip>
              <Tooltip placement="bottom" title={'删除账号'}>
                <i onClick={() => showToolBar && this.handleDeleteAccount(record.id)}
                   className={delTab}/>
              </Tooltip>
            </div>
          );
        },
      }
    ];

    return (
      <CustomTable columns={columns}
                   dataSource={list}
                   loading={isListLoading}
                   offsetHeight={367}
                   totalNum={totalNum}
                   onChange={this.handleTableChange}
                   rowKey="id"/>
    );
  }
}

export default AuthorityTable;

