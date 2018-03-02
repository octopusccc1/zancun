import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'particles.js';

import config from './default.json';

class CanvasBackground extends Component {

  static propTypes = {
    config: PropTypes.object
  };

  static defaultProps = {
    config: config
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  drawCanvas() {
    const particlesJS = window.particlesJS;
    const {config} = this.props;
    particlesJS('particles-js', config);
    //particlesJs 没有加载完成回调
    setTimeout(() => {
      window.addEventListener('resize', this.resize);
      this.resize();
      window.dispatchEvent(new Event('resize'));
    });
  }

  resize = () => {
    const canvas = this.refs.canvas;
    if (!canvas || !canvas.parentNode) return;
    const parentNode = canvas.parentNode;
    const {width, height} = parentNode.getBoundingClientRect();
    this.setState({
      width,
      height
    });
  };

  render() {
    return (
      <div id="particles-js" ref="canvas"
           style={{position: 'absolute', left: 0, top: 0, width: this.state.width, height: this.state.height}}
      />
    );
  }
}

export default CanvasBackground;
