import React, { Component } from 'react';
import { Button } from 'antd';
import { getConfig } from '../../../config';
import noResultImg from '../../../assets/image/insight_error@2x.png';
import './NoPrivateResult.less';

const config = getConfig();
const NoPrivateResult = () => {
  return (<div className="no-private-tag">
    <img src={noResultImg} alt=""/>
    <p>已全部隐藏，请点击私有标签调整显示状态</p>
    <a className="m-customer-empty-link" href={config.url.privateTagsList}>
      <Button className="u-btn-create-empty" type="ghost">私有标签</Button>
    </a>
  </div>);
};
export default NoPrivateResult;
