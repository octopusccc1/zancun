import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class TagType extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    tagType: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { prefixCls, tagType } = this.props;
    return (
      <div className={`${prefixCls}-group`}>
        {tagType}
      </div>
    );
  }
}
export default TagType;
