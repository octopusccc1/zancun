import React from 'react';
import { AutoComplete, Button, Tabs, Tooltip, Popover, Select } from 'antd';
import { groupCity } from '../../../utils/city';
import PropTypes from 'prop-types';

import './CityPicker.less';

const TabPane = Tabs.TabPane;
const letters = 'ABCDEFGHJKLMNPQRSTWXYZ';

//定制下拉选项的样式
function renderOption(item) {
  return (
    <Select.Option key={item.value} text={item.text} pingyin={item.pinyin}>
      {item.text}
    </Select.Option>
  );
}

class CityPicker extends React.Component {

  static propTypes = {
    defaultCity: PropTypes.object,
    active: PropTypes.bool,
    isCityLoading: PropTypes.bool,
    cities: PropTypes.object,
    onChange: PropTypes.func,
    handleOtherToggle: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    handleOtherToggle: ()=>{}
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentCity: this.props.defaultCity
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.defaultCity && this.props.defaultCity !== nextProps.defaultCity){
      this.setState({
        currentCity: nextProps.defaultCity
      });
    }
    if(this.props.active !== nextProps.active ){
      this.setState({
        visible: nextProps.active,
      });
    }
  }

  //选择一个城市
  handleChooseCity(city) {
    this.setState({
      visible: false,
      currentCity: city
    }, () => {
      this.props.onChange(city);
    });
  }

  //搜索列表中被选中时调用
  handleSelect(value) {
    const city = this.props.cities.allCities.filter(i => i.value === value)[0];
    this.handleChooseCity(city);
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible },()=>{
      this.props.handleOtherToggle(this.state.visible);
    });
  }

  render() {
    const me = this;
    const { visible, currentCity } = this.state;
    const { cities, isCityLoading } = this.props;

    if(isCityLoading || !cities || !cities.allCities || !cities.favoriteCities || !cities.hotCities){
      return (
        <div className="city-picker-container">
          <Button loading className="city-picker-click-area">
            加载中...
          </Button>
        </div>
      );
    }else{
      //根据字母分类
      const [tabList, cityGroupList] = groupCity(letters, cities.allCities);
      //根据输入项进行筛选
      const filterOption = function (inputValue, option) {
        return option.props.pingyin.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        || option.props.text.indexOf(inputValue) !== -1;
      };

      const content = (
        <div className="city-picker-content">
          <div className="search-city-content" ref="search-city-content">
            <AutoComplete
              dataSource={cities.allCities.map(renderOption)}
              onSelect={this.handleSelect.bind(this)}
              placeholder="请输入城市名称"
              filterOption={filterOption}
              allowClear={true}
              getPopupContainer={()=>this.refs['search-city-content']}
            />
          </div>

          <div className="fav-city-content">
            <span>常用城市：</span>
            {
              cities.favoriteCities.map((city, i) =>
                <a  className="city-name" key={i} onClick={me.handleChooseCity.bind(this, city)}>{city.text} </a>
              )
            }
          </div>

          <div className="all-cities-tab">
            <Tabs defaultActiveKey="1" size="small">
              <TabPane tab="热门城市" key="1">
                {
                  cities.hotCities.map((city, i) =>
                    <a className="city-name" key={`hot-city-item-${i}`} onClick={me.handleChooseCity.bind(this, city)}>{city.text} </a>
                  )
                }
              </TabPane>
              {
                tabList.map((tab,i) =>
                  <TabPane tab={tab} key={`tab-item-${i}`}>
                    {
                      cityGroupList[tab].map((cities,k) =>
                        <div key={k} className="letter-group-cities">
                          <div className="letter">{cities.letter}</div>
                          <div className="cities">
                            {
                              cities.children.map((city, j) =>
                                <a key={`all-city-item-${j}`} onClick={me.handleChooseCity.bind(this, city)}>
                                  <Tooltip placement="bottom" title={city.text}>
                                    {city.text}
                                  </Tooltip>
                                </a>
                              )
                            }
                          </div>
                        </div>
                      )
                    }
                  </TabPane>
                )
              }
            </Tabs>
          </div>
        </div>
      );
      return (
        <div className="city-picker-container">
          <Popover
            placement="bottomLeft"
            content={content}
            trigger="click"
            visible={visible}
            onVisibleChange={me.handleVisibleChange.bind(this)}
            getPopupContainer={() => document.querySelector('.time-picker-container')}
          >
            <div className="city-picker-click-area">
              <span className="city-picker-click-area-text">{currentCity.text}</span>
              <span className={visible ? "city-picker-click-area-icon icon-active" : "city-picker-click-area-icon"}>
             <i className="iconfont icon-xiajiantou" />
            </span>
            </div>
          </Popover>
        </div>
      );
    }
  }
}

export default CityPicker;
