/**
 * 客户端提示文本，支持参数，不通类型的key加前缀以作区别
 * @author hzmajianglong@corp.netease.com
 */
export const message = {
  // -------------------- validate -----------------------
  // 修改密码
  VALIDATE_OLD_PASSWORD_ERR: '原密码错误',
  VALIDATE_PASSWORD_FORMAT_ERR: '请输入{0}-{1}位密码（包含数字、字母）',
  VALIDATE_NEW_PASSWORD_SAME_ERR: '新密码与原密码相同',
  VALIDATE_NEW_PASSWORD_INCONSISTANT_ERR: '确认新密码与新密码不一致',

  // -------------------- placeholder ---------------------
  PLACEHOLDER_NEW_PASSWORD: '请输入{0}-{1}位密码（包含数字、字母）',
  // -------------------- message ---------------------
  TAG_DISABLED_MESG: '洞察条件已失效，请重新选择',
  TAG_PARTIAL_DISABLED_MESG: '部分洞察条件已失效，请及时更新',
  TAG_VALUE_DISABLED_MESG: '标签内容已失效，请更新洞察条件',
  TAG_CUSTOMER_DISABLED_MESG: '客群条件已失效，请重新选择',
  POSITION_DISABLED_MESG: '洞察条件已失效，请重新选择',
  POSITION_PARTIAL_DISABLED_MESG: '部分洞察条件已失效，请及时更新',
  POSITION_CUSTOMER_DISABLED_MESG: '客群条件已失效，请重新选择',
  POSITION_CUSTOMER_PARTIAL_DISABLED_MESG: '部分客群条件已失效，请及时更新',
};
