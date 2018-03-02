import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const Search = Input.Search;

class TagFilter extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    onSearch: PropTypes.func,
    enterButton: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  stopEvent = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  render() {
    const { prefixCls, placeholder, onSearch, size, enterButton } = this.props;
    return (
      <div className={`${prefixCls}-filter`}>
        <Search
          className={`${prefixCls}-filter-input`}
          placeholder={placeholder}
          onSearch={onSearch}
          size={size}
          enterButton={enterButton}
          onKeyPress={this.stopEvent}
        />
      </div>
    );
  }
}
export default TagFilter;
