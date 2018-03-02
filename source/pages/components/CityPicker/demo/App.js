import React, {Component} from 'react';
import './App.less';
import CityPicker from '../CityPicker';

const cities = {
  favoriteCities: [
    {
      text: "北京",
      value: "110000",
      letter: "B",
      pinyin: "BEIJING"
    },
    {
      text: "上海",
      value: "310000",
      letter: "S",
      pinyin: "SHANGHAI"
    },
    {
      text: "广州",
      value: "440100",
      letter: "G",
      pinyin: "GUANGZHOU"
    },
    {
      text: "深圳",
      value: "440300",
      letter: "S",
      pinyin: "SHENZUO"
    },
  ],
  hotCities: [
    {
      text: "北京",
      value: "110000",
      letter: "B",
      pinyin: "BEIJING"
    },
    {
      text: "上海",
      value: "310000",
      letter: "S",
      pinyin: "SHANGHAI"
    },
    {
      text: "广州",
      value: "440100",
      letter: "G",
      pinyin: "GUANGZHOU"
    },
  ],
  allCities: [
    {
      text: "北京",
      value: "110000",
      letter: "B",
      pinyin: "BEIJING"
    },
    {
      text: "天津",
      value: "120000",
      letter: "T",
      pinyin: "TIANJIN"
    },
    {
      text: "石家庄",
      value: "130100",
      letter: "S",
      pinyin: "SHIJIAZHUANG"
    },
    {
      text: "唐山",
      value: "130200",
      letter: "T",
      pinyin: "TANGSHAN"
    },
    {
      text: "秦皇岛",
      value: "130300",
      letter: "Q",
      pinyin: "QINHUANGDAO"
    },
    {
      text: "邯郸",
      value: "130400",
      letter: "H",
      pinyin: "HANDAN"
    },
    {
      text: "邢台",
      value: "130500",
      letter: "X",
      pinyin: "XINGTAI"
    },
    {
      text: "保定",
      value: "130600",
      letter: "B",
      pinyin: "BAODING"
    },
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //默认城市
      defaultCity: {
        text: '杭州',
        value: 'hangzhou',
      },
      //当前城市
      currentCity: {
        text: '杭州',
        value: 'hangzhou',
      },
    };
  }

  //选择城市
  handleCityChange(city) {
    this.setState({
      currentCity: {
        text: city.text,
        value: city.value
      }
    });
  }

  render() {
    const { currentCity, defaultCity } = this.state;
    /**
     * quickOption - 快速选择选项 格式[{ text: '昨天', value: 1 }]
     * dateFormat - 展示的日期格式 默认："YYYY/MM/DD"
     * allowClear - 是否显示清除按钮 默认false
     * disabledDate - 不可选的时间
     * defaultCity - 是否展开选择区
     * isCityLoading - 是否正在加载城市列表
     * onChange - 城市变化回调函数
     */
    return (
      <div className="time-picker" style={{float:"left"}}>
        <CityPicker
          cities={cities}
          defaultCity={defaultCity}
          isCityLoading={false}
          onChange={this.handleCityChange.bind(this)}
        />
      </div>
    );
  }
}

export default App;
