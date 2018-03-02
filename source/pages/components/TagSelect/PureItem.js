import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox } from 'antd';

class PureItem extends Component {
  static defaultProps = {
    onItemChange: () => {},
  }

  static propTypes = {
    visible: PropTypes.bool,
    checked: PropTypes.bool,
    item: PropTypes.object,
    onItemChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }

  componentWillReceiveProps(nextProps) {
    if ( this.state.visible != nextProps.visible ) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }

  render() {
    const { checked, item, onItemChange } = this.props;
    return (
      <li
        style={{ display: this.state.visible ? 'block' : 'none' }}
        onClick={() => onItemChange(item)}
        className={classNames({current: checked})}
      >
        { checked ? <Checkbox checked={true} /> : null}
        <span className="m-tag-select-puretext-text">{item.text}</span>
      </li>
    );
  }
}

export default PureItem;
