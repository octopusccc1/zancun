import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Popover, message } from 'antd';

import './TimePicker.less';

//默认快速选择时间选项
const defaultQuickTimeOption = [
  { text: '前天', value: 1 },
  { text: '过去7天', value: 7 },
  { text: '过去30天', value: 30 },
];

const { RangePicker } = DatePicker;

class TimePicker extends React.Component {

  static propTypes = {
    quickOption: PropTypes.array,
    dateFormat: PropTypes.string,
    allowClear: PropTypes.bool,
    active: PropTypes.bool,
    defaultTime: PropTypes.object,
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    handleOtherToggle: PropTypes.func,
    maxDateRange: PropTypes.number
  }

  static defaultProps = {
    quickOption: defaultQuickTimeOption,
    dateFormat: "YYYY/MM/DD",
    allowClear: false,
    active: false,
    defaultTime: defaultQuickTimeOption[0],
    disabledDate: () => {},
    onChange: () => {},
    handleOtherToggle: ()=>{},
    maxDateRange: null
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.defaultTime,
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.defaultTime && this.props.defaultTime !== nextProps.defaultTime){
      this.setState({
        currentTime: nextProps.defaultTime
      });
    }
    if(this.props.active !== nextProps.active){
      this.setState({
        visible: nextProps.active,
      });
    }
  }

  handleQickTime(item) {
    this.setState({
      currentTime: item,
      visible: false,
    }, () => {
      this.props.onChange(this.state.currentTime);
    });
  }

  handleCustomerTime(date, dateString) {
    const maxRange = this.props.maxDateRange;
    if(maxRange && maxRange > 0) {
      if(date.length === 2 && (date[1].valueOf() - date[0].valueOf()) / 86400000 > maxRange){
        message.error('最大选择范围不能超过'+maxRange+'天');
        return;
      }
    }
    const timeString = dateString[0] + ' ~ ' + dateString[1];
    this.setState({
      currentTime: {
        text: timeString,
        value: timeString
      },
      visible: false,
    }, () => {
      this.props.onChange(this.state.currentTime);
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible },()=>{
      this.props.handleOtherToggle(this.state.visible);
    });
  }

  render() {
    const me = this;
    const {quickOption, dateFormat, allowClear, disabledDate} = this.props;
    const {currentTime, visible} = this.state;
    const content = (
      <div className="time-picker-content">
        {
          quickOption.map((item, index) =>
            <a
              className={(item.text === currentTime.text)? "quick-picker-item quick-picker-item-active" : "quick-picker-item"}
              key={`quick-item-${index}`}
              onClick={me.handleQickTime.bind(this, item)}>
              <span>{item.text}</span>
              {
                item.text === currentTime.text ? <i className="iconfont icon-duigou" /> : null
              }
            </a>
          )
        }
        <div className="time-picker-customer-time" ref="time-picker-customer-time">
          <div className="time-picker-customer-time-text">自定义时间</div>
          <RangePicker
            allowClear={allowClear}
            disabledDate={disabledDate}
            format={dateFormat}
            getCalendarContainer={()=>this.refs['time-picker-customer-time']}
            onChange={me.handleCustomerTime.bind(this)}
          />
        </div>
      </div>
    );

    return (
      <div className="time-picker-container">
        <Popover
          placement="bottomLeft"
          content={content}
          trigger="click"
          visible={visible}
          onVisibleChange={me.handleVisibleChange.bind(this)}
          getPopupContainer={() => document.querySelector('.time-picker-container')}
        >
          <div className="time-picker-click-area">
            <span className="time-picker-click-area-text">{currentTime.text}</span>
            <span className={visible ? "time-picker-click-area-icon icon-active" : "time-picker-click-area-icon"} >
              <i className="iconfont icon-xiajiantou" />
            </span>
          </div>
        </Popover>
      </div>
    );
  }
}

export default TimePicker;
