/**
 * 打包文件已将constants整体打包到vendor.js，为了合理利用浏览器缓存，
 * 其他页面引用constants请使用import from '../constants'，
 * 引用整个文件夹就行了，不需要指定引用到'../constants/limit'
 */
import { message } from './message';
import { storageKey } from './storageKey';
import { limit } from './limit';
import { defaultVal } from './default';
import { map } from './map';
const json = Object.assign(message, storageKey, limit, defaultVal, map);
export default json;
