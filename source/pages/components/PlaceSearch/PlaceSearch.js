import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Input, AutoComplete } from 'antd';
import './PlaceSearch.less';

const Option = AutoComplete.Option;

//定制下拉选项的样式
function renderOption(item) {
  return (
    <Option key={item.name+'-'+item.id+item.adcode+item.address} text={item.name}>
      <Icon type="search" className="search-result-icon" />
      <span className="search-result-name">
        {item.name}
      </span>
      <span className="search-result-district">
        {item.district}
      </span>
    </Option>
  );
}


class PlaceSearch extends React.Component {
  static propTypes = {
    currentCity: PropTypes.object,
    style: PropTypes.object,
    onFocus: PropTypes.func,
    onSearch: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.inputElement = null;
    //自动补全实例
    this.auto = new window.AMap.Autocomplete();
    //搜索实例
    this.placeSearch = new window.AMap.PlaceSearch({
      //map: props.__map__
    });
    this.state = {
      dataSource: []
    };
  }

  //搜索补全项的时候调用
  handleSearch(value) {
    this.auto.setCity(this.props.currentCity.text);
    this.auto.search(value, function(status, result){
      const resultSearch = result.tips;
      this.setState({
        dataSource: value ? resultSearch : [],
      });
    }.bind(this));
  }

  //被选中时调用
  handleSelect(value) {
    this.placeSearch.setCity(this.props.currentCity.text);
    this.placeSearch.search(value.split('-')[0], (status, result) => {
      if (status === 'complete' && result.info === 'OK' && result.poiList && result.poiList.pois) {
        this.props.onSearch(result.poiList.pois);
      }
    });
  }

  //搜索按钮
  handleClickSearchButton(){
    let inputValue = this.inputElement.props.value;
    if(inputValue){
      this.handleSelect(inputValue);
    }
  }

  render() {
    const me = this;
    const { style } = this.props;
    const { dataSource } = this.state;
    return (
      <div style={style} className={'place-search-container'} ref="place-search-container">
        <AutoComplete
          className="global-search"
          dataSource={dataSource?dataSource.map(renderOption):[]}
          onSelect={this.handleSelect.bind(this)}
          onSearch={this.handleSearch.bind(this)}
          placeholder="请输入搜索内容"
          optionLabelProp="text"
          allowClear={true}
          getPopupContainer={()=>this.refs['place-search-container']}
        >
          <Input
            suffix={(
              <Button className="search-btn"
                      size="large"
                      type="primary"
                      onClick={this.handleClickSearchButton.bind(this)}
              >
                <Icon type="search" />
              </Button>
            )}
            onFocus={this.props.onFocus}
            ref={el => this.inputElement = el}
          />
        </AutoComplete>
      </div>
    );
  }
}

export default PlaceSearch;
