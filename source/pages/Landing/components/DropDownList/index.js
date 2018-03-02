/**
 * 客群洞察
 * 查看更多模块
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Popover, Tooltip} from 'antd';

import './index.less';

class DropDownList extends Component {
  static propTypes = {
    title: PropTypes.string,
    list: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      showTips: false,
      tipWidth: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.setTipWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTipWidth);
  }

  handleVisibleChange = (visible) => {
    this.setState({
      showTips: visible
    });
    !!visible && this.setTipWidth();
  };

  setTipWidth = () => {
    if (!this.refs.content) return;
    const width = this.refs.content.offsetWidth / 2 + 30;
    this.setState({
      tipWidth: width
    });
  };

  render() {
    const {title, list} = this.props;
    const moreClz = classnames(
      'u-list-item',
      'u-more',
      {'active': this.state.showTips}
    );

    return (
      <div className="bd-content" ref="content">
        <p className="bd-tlt">{title}</p>
        <ul>
          {list.slice(0, 4).map((item, index) =>
            <li key={index} className="u-list-item">
              <p className="u-item">
                <Tooltip placement="bottom" title={item.condition}>
                  <span>{ item.customized ? <span className="private-tag">私</span> : null }{item.condition}</span>
                </Tooltip>
              </p>
            </li>
          )}

          {list.length > 4 && (
            <li className={moreClz}>
              <Popover placement="bottomLeft" content={(
                <ul>
                  {list.slice(4).map((item, index) =>
                    <li key={index}>
                      <Tooltip placement="bottom" title={item.condition}>
                        <span>{ item.customized ? <span className="private-tag">私</span> : null }{item.condition}</span>
                      </Tooltip>
                    </li>
                  )}
                </ul>
              )} trigger="click"
                       overlayClassName="u-hovercard"
                       getPopupContainer={() => document.querySelector('.m-insight-landing')}
                       overlayStyle={{'width': this.state.tipWidth}}
                       onVisibleChange={this.handleVisibleChange}>
                <p>
                    <span>查看更多</span>
                </p>
              </Popover>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default DropDownList;
