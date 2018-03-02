// 统一声明默认State
import { getAccessToken } from '../utils';
import { LOCAL_REMEMBER_ACCOUNT, LOCAL_REMEMBER_PASSWORD } from '../constants';

const {app} = window.setting || {};
const {name, account, role, id} = app || {};
const username = localStorage.getItem(LOCAL_REMEMBER_ACCOUNT) || '';
const password = localStorage.getItem(LOCAL_REMEMBER_PASSWORD) || '';
export default {
  // 页面全局状态
  header: {
    // 是否已登录认证
    isAuthenticated: !!getAccessToken(),
    // 姓名
    name: name || '',
    // 账号
    account: account || '',
    // 角色权限
    role,
    // 账号id
    id
  },

  // 登录相关
  login: {
    // 是否显示登录错误信息
    isLoginErrorVisible: false,
    // 登录错误信息
    loginErrorText: '',
    // 登录域
    fields: {
      username,
      password,
      remember: !!password
    },
  },

  // 标签客群创建
  createByTag: {
    condition: null, // 用户选中标签的数据
    defaultCondition: null, // 企业可用的标签列表
    privateCondition: null, // 用户选中私有标签的数据
    defaultPrivateCondition: null, // 企业可用的私有标签列表
    isDataLoaded: false, // 标签相关数据是否加载完成
    isPrivateDataLoaded: false, // 私有标签相关数据是否加载完成
    isPrivateTagsNotNull: window.setting && window.setting.isPrivateTagsNotNull
  }
};
