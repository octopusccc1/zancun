/**
 * 针对接口返回信息的前端展示数据MAP
 */
const TAG_SVG = require('../assets/image/标签_small.svg');
const PRIVATE_TAG = require('../assets/image/私有标签_small.svg');
const POI_SVG = require('../assets/image/POI_small.svg');
const COMBINATION_SVG = require('../assets/image/客群组合.svg');
const IMPORT_SVG = require('../assets/image/导入数据_small.svg');
const POSITION_SVG = require('../assets/image/位置上报_small.svg');
const EXPANSION_SVG = require('../assets/image/客群拓展_small.svg');
const AD_SVG = require('../assets/image/广告受众.svg');

const TAG_LANDING = require('../assets/image/landing/landing_tag.png');
const PRIVATE_TAG_LANDING = require('../assets/image/landing/landing_private_tag.png');
const POI_LANDING = require('../assets/image/landing/landing_poi.png');
const COMBINATION_LANDING = require('../assets/image/landing/landing_combination.png');
const IMPORT_LANDING = require('../assets/image/landing/landing_import.png');
const POSITION_LANDING = require('../assets/image/landing/landing_position.png');
const EXPANSION_LANDING = require('../assets/image/landing/landing_expansion.png');
const AD_LANDING = require('../assets/image/landing/landing_ad.png');

export const map = {
  // 角色列表
  ROLE_MAP: {
    1: '超级管理员',
    2: '管理员',
    3: '普通账号'
  },
  // 客群来源
  CUSTOMER_SOURCE_MAP: {
    1: {
      icon_image: TAG_SVG,
      landing_image: TAG_LANDING,
      type: '标签',
      insight_link: '/insight/createByTag'
    },
    1.1: {
      icon_image: PRIVATE_TAG,
      landing_image: PRIVATE_TAG_LANDING,
      type: '私有标签',
      insight_link: '/insight/createByOriginal'
    },
    2: {
      icon_image: POI_SVG,
      landing_image: POI_LANDING,
      type: 'POI',
      insight_link: '/insight/createByPOI'
    },
    3: {
      icon_image: COMBINATION_SVG,
      landing_image: COMBINATION_LANDING,
      type: '客群组合',
      insight_link: '/insight/createByOriginal'
    },
    4: {
      icon_image: IMPORT_SVG,
      landing_image: IMPORT_LANDING,
      type: '数据导入',
      insight_link: '/insight/createByOriginal'
    },
    5: {
      icon_image: POSITION_SVG,
      landing_image: POSITION_LANDING,
      type: '位置上报',
      insight_link: '/insight/createByPosition'
    },
    6: {
      icon_image: EXPANSION_SVG,
      landing_image: EXPANSION_LANDING,
      type: '客群拓展',
      insight_link: '/insight/createByOriginal'
    },
    7: {
      icon_image: AD_SVG,
      landing_image: AD_LANDING,
      type: '广告受众',
      insight_link: '/insight/createByOriginal'
    }
  }
};
