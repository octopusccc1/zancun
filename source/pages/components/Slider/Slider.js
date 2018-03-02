import React from 'react';
import PropTypes from 'prop-types';
import './Slider.less';

class Slider extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    className: PropTypes.string,
    valueChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const me = this;
    const {min, max, value, className} = this.props;
    return (
        <input
          className={className}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={this.props.valueChange.bind(this)}
        />
    );
  }
}

export default Slider;
