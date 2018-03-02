import React, {Component} from 'react';
import CanvasBackgrond from '../index';
import './App.less';
import config from './particlesjs-config.json';
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bg-wrapper">
        <CanvasBackgrond config={config}/>
      </div>
    );
  }
}

export default App;
