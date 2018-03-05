/**
 * 页面内配置的一些默认信息
 */
const insightDefault = require('../assets/image/洞察-默认.png');
export const defaultVal = {
  INSIGHT_ICON_DEFAULT: insightDefault,
  // 网站名称
  SITE_NAME: 'xx',
  // 默认菜单，服务端菜单失效时使用默认菜单
  DEFAULT_MENU: [
    {"key":"login","text":"登录","url":"/login/","children":[]},
    {"key":"landing","text":"承接页","url":"/landing/","children":[]},
    {"key":"setting","text":"设置","url":"/setting/","children":[]},
    {"key":"authority","text":"权限","url":"/authority/","children":[]},
    {"key":"notFound","text":"404","url":"/notFound/","children":[]}
  ],
  // 菜单key
  menu: {
    LANDING: 'landing',
    SETTING: 'setting',
    AUTHORITY: 'authority',
  },
  // 默认菜单显示的icon，见iconfont
  DEFAULT_MENU_ICON: {
    'landing': 'icon-kequndongcha',
    'setting': 'icon-kequnguanli',
    'authority': 'icon-kequnjulei',
  },
};
