/**
 * 页面内配置的一些默认信息
 */
const iconDefault = require('../assets/image/标签icon-默认图.png');
const iconCurrent = require('../assets/image/标签icon默认图-选中.png');
const insightDefault = require('../assets/image/洞察-默认.png');
export const defaultVal = {
  ICON_DEFAULT: iconDefault,
  ICON_CURRENT: iconCurrent,
  INSIGHT_ICON_DEFAULT: insightDefault,
  // 标签渐变颜色默认
  GRADIENT_START_DEFAULT: '#8d94a1',
  GRADIENT_END_DEFAULT: '#f5f5f5',
  // 默认菜单，服务端菜单失效时使用默认菜单
  DEFAULT_MENU: [
    {
      key: 'landing',
      text: '客群洞察',
      url: '/landing/',
      children: []
    },
    {
      key: 'tagDistance/list',
      text: '关联分析',
      url: '/tagDistance/list/',
      children: []
    },
    {
      key: 'customer/list',
      text: '客群管理',
      url: '/customer/list/',
      children: []
    },
    {
      key: 'privateTags/list',
      text: '私有标签',
      url: '/privateTags/list/',
      children: []
    }
  ],
  // 菜单key
  menu: {
    // 客群洞察
    INSIGHT: 'landing',
    // 客群管理
    CUSTOMER_MGMT: 'customer/list',
    TAG_DISTANCE: 'tagDistance/list',
    PRIVATE_TAGS: 'privateTags/list',
  },
  // 默认菜单显示的icon，见iconfont
  DEFAULT_MENU_ICON: {
    'landing': 'icon-kequndongcha',
    'customer/list': 'icon-kequnguanli',
    'tagDistance/list': 'icon-kequnjulei',
    'privateTags/list': 'icon-siyoubiaoqian',
  },
  // 洞察类型
  insightType: {
    POI: 'poi',
    TAG: 'tag',
    CUSTOMER_GROUP: 'customer_group',
    POSITION: 'position'
  },
  // 客群类型
  customerType: {
    POI: 'poi',
    TAG: 'tag',
    CUSTOMER_GROUP: 'customer_group',
    IMPORT: 'import',
    POSITION: 'position',
    EXPANSION: 'expansion'
  },
  // 客群或洞察类型
  sourceValue: {
    tag: 1,
    poi: 2,
    customer_group: 3,
    import: 4,
    position: 5,
    expansion: 6
  },
  // 客群操作符
  customerGroupOperator: {
    UNION: 'union',
    INTERSECTION: 'intersection'
  },
  // 洞察模板来源
  templateSource: {
    CUSTOM: 0,
    KIBANA: 1,
    YOUDATA: 2,
  },
};
