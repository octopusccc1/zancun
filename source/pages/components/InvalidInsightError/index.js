import React, {Component, Children} from 'react';
import './index.less';
import InvalidImage from '../../../assets/image/InvalidIdImage.png';
import queryString from 'query-string';

class InvalidInsightError extends Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(location.search);
    let errorTip;
    if (parsed.insightId) {
      errorTip = '该洞察已被删除或不存在';
    } else if (parsed.customerId) {
      errorTip = '该客群已被删除或不存在';
    } else {
      errorTip = '未知错误';
    }
    this.state = {
      errorTip
    };
  }

  render() {
    return (
      <div className="m-insight-error">
        <img src={InvalidImage} alt="" className="m-insight-error-img"/>
        <p className="m-insight-error-content">{this.state.errorTip}</p>
      </div>
    );
  }
}

export default InvalidInsightError;
