import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { getTimeStamp, thousandSplit, distinguishTagType } from '../../../utils';
import { CUSTOMER_SOURCE_MAP } from '../../../constants';

import './CustomerCard.less';

class CustomerCard extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    contentObj: PropTypes.object,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
  }

  constructor(props) {
    super(props);
  }

  handleSelect(contentObj) {
    this.props.onSelect(contentObj);
  }

  render() {
    const {contentObj,checked} = this.props;
    let source = contentObj.source;
    if(source === 1 && contentObj.detail){
      // 标签创建有两种方式：公共标签 and 私有标签
      source = distinguishTagType(contentObj.detail);
    }
    const SOURCE = CUSTOMER_SOURCE_MAP[source] || {};
    const {icon_image, type} = SOURCE;

    return (
      <div className={"m-customer-card" + (checked ? " customer-card-checked" : "")} onClick={this.handleSelect.bind(this,contentObj)}>
        <div className="left">
          <div className="icon">
            <Tooltip placement="bottom" title={type}>
              <img src={icon_image} alt="类型" className="u-img-link"/>
            </Tooltip>
          </div>
        </div>
        <div className="right">
          <div className="title">
            <Tooltip placement="bottom" title={contentObj.name}>
              <h3 className="u-tlt">
                {contentObj.name}
              </h3>
            </Tooltip>
          </div>
          <div className="content">
            <p>
              <span className="label">客群量</span>
              <span className="form">{thousandSplit(contentObj.quantity)}</span>
            </p>
            <p>
              <span className="label">时<span style={{float: 'right'}}>间</span></span>
              <span className="form">{getTimeStamp(contentObj.createTime)}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerCard;
