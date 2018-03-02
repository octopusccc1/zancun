import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Popover, Icon} from 'antd';
import {customerType, insightType} from '../../../constants';
import AnimationImageLoader from '../../../components/AnimationImageLoader';
import {decodeHTML} from '../../../utils';
import './landingTag.less';

class LandingTag extends Component {
  static propTypes = {
    status: PropTypes.number,
    url: PropTypes.string,
    iconUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    kind: PropTypes.string,
    message: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {iconUrl, url, title, description, status, message} = this.props;
    if (status === 0) {
      return (
        <li className="u-nav-li u-nav-disabled">
          <AnimationImageLoader extraCls="u-nav-icon" src={iconUrl}/>
          <h1 className="u-nav-tlt animation-type-1">
            {title}
            <Popover placement="bottom" content={
              /* eslint-disable */
              <p className="u-landing-popover-content" dangerouslySetInnerHTML={{__html: decodeHTML(message)}}>
              </p>
            } trigger="hover" overlayClassName="u-landing-popover">
              <Icon className="icon" type="question-circle"/>
            </Popover>
          </h1>
          <p className="u-nav-p animation-type-1">{description}</p>
        </li>
      );
    } else {
      return (
        <li className="u-nav-li">
          <a href={url}>
            <AnimationImageLoader extraCls="u-nav-icon" src={iconUrl}/>
            <h1 className="u-nav-tlt animation-type-1">{title}</h1>
            <p className="u-nav-p animation-type-1">{description}</p>
          </a>
        </li>
      );
    }
  }
}

export default LandingTag;
