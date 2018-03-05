import React, { PureComponent } from 'react';
import MainLayout from '../MainLayout';
import BasicForm from './components/BasicForm';
import PasswordForm from '../components/setting/PasswordForm';

import './Setting.less';
import {menu} from "../../constants";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainLayout isCheckLogin={true} menu={menu.SETTING}>
        <div className="g-mnc g-mnc-setting">
          <div className="m-setting-section">
            <h3>基本信息</h3>
            <BasicForm/>
          </div>
          <div className="m-setting-section">
            <h3>修改密码</h3>
            <PasswordForm/>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default App;
