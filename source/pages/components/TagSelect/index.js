import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import { Checkbox, Spin, Tooltip } from 'antd';
import classNames from 'classnames';
import Collapse from '../../../components/Collapse';
import TreeSelect from '../../../components/TreeSelect';
import PureItem from './PureItem';
import TagType from './TagType';
import TagFilter from './TagFilter';
import './index.less';
import { request } from '../../../utils/ajax';
import { ICON_DEFAULT, ICON_CURRENT, GRADIENT_START_DEFAULT,
  GRADIENT_END_DEFAULT, TAG_LIST_MAX_LEN } from '../../../constants';
import noResultImg from '../../../assets/image/insight_error@2x.png';

// 标签搜索和标签枚举值搜索开启条件
const TAG_FILTER_LIMIT = 50;
const CollapsePanel = Collapse.Panel;
const componentLog = debug('component:log');
const colorSplit = (startHex = GRADIENT_START_DEFAULT, endHex = GRADIENT_END_DEFAULT, len) => {
  startHex = startHex.replace('#', '');
  endHex = endHex.replace('#', '');
  const returned = [];
  const getColor = (startLen, startHex, endHex, len, i) => {
    const startNum = parseInt(startHex.substr(startLen, 2), 16);
    const endNum = parseInt(endHex.substr(startLen, 2), 16);
    return Math.floor(startNum + (endNum - startNum) / (len-1) * i);
  };
  const getRGB = (startHex, endHex, len, i) => {
    return {
      r: getColor(0, startHex, endHex, len, i),
      g: getColor(2, startHex, endHex, len, i),
      b: getColor(4, startHex, endHex, len, i),
    };
  };
  for (let i = 0; i < len; i++) {
    const { r, g, b } = getRGB(startHex, endHex, len, i);
    returned.push(`#${r.toString(16)}${g.toString(16)}${b.toString(16)}`);
  }
  return returned.reverse();
};
// 过滤已停用标签
const filterEnabledTag = (it) => {
  return it.status == 1;
};
const getFilterTagKeywords = (keyArr, keywords) => {
  return (it) => {
    const value = keyArr
      .map(key => it[key])
      .find(v => !!v);
    return value && value.indexOf(keywords) > -1;
  };
};
const Total = (props) => {
  return <div className={props.className}>当前共{props.total}个标签</div>;
};

const NoDataResult = () => {
  return (<div className="m-tag-select-no-data-result">
    当前暂无标签
  </div>);
};
const NoFilteredResult = () => {
  return (<div className="m-tag-select-no-filtered-result">
    <img src={noResultImg} alt=""/>
    <p>很抱歉，没有搜索到您要的内容</p>
  </div>);
};

class TagSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    // 本地数据
    data: PropTypes.array,
    // web服务提供的数据源
    dataSourceId: PropTypes.string,
    // 树形数据项（包含嵌套结构）是否勾选
    treeSelected: PropTypes.object,
    // 全部数据项（不包含嵌套结构）是否勾选
    tagSelected: PropTypes.array,
    // 是否根据标签分组名分组
    isSortByTagType: PropTypes.bool,
    children: PropTypes.node,
    onTabChange: PropTypes.func,
    // select类型单选触发
    onItemChange: PropTypes.func,
    // 全选时触发
    onAllItemChange: PropTypes.func,
    // select类型数据变化触发
    onSelectChange: PropTypes.func,
    // 树形类型数据变化触发
    onTreeChange: PropTypes.func,
    // 初始数据无结果
    noDataResult: PropTypes.node,
    // 搜索无结果
    noFilteredResult: PropTypes.node,
  };

  static defaultProps = {
    treeSelected: {},
    tagSelected: [],
    isSortByTagType: false,
    onTabChange: () => {},
    onItemChange: () => {},
    onAllItemChange: () => {},
    onSelectChange: () => {},
    onTreeChange: () => {},
    noDataResult: <NoDataResult />,
    noFilteredResult: <NoFilteredResult />
  };

  constructor(props) {
    super(props);
    this.initData = this.initData.bind(this);
    this.initMoreListVisibleMap = this.initMoreListVisibleMap.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onAllItemChange = this.onAllItemChange.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onTreeChanged = this.onTreeChanged.bind(this);
    this.setMoreList = this.setMoreList.bind(this);
    this.getTagContent = this.getTagContent.bind(this);
    this.getRadio = this.getRadio.bind(this);
    this.getSelect = this.getSelect.bind(this);
    this.getTree = this.getTree.bind(this);
    this.getSelectedByKey = this.getSelectedByKey.bind(this);
    const defaultActiveKeys = this.getCollapseActiveKey();
    this.state = {
      // 显示数据
      data: null,
      // 非树形结构数据的勾选状态列表
      // const tagSelected = [{
      //   key: 'age',
      //   values: ['a1']
      // }, {
      //   key: 'constellation',
      //   values: []
      // }, {
      //   key: 'online',
      //   values: ['b2']
      // },{
      //   key: 'city',
      //   values: ['13232dad2']
      // }];
      filterTagKeywords: undefined,
      filterTagValue: {},
      tagSelected: props.tagSelected || [],
      treeSelected: props.treeSelected || {},
      // 显示更多数据项目的map
      moreListVisibleMap: null,
      activeTabKeys: defaultActiveKeys,
    };
  }

  componentWillMount() {
    const { data, dataSourceId } = this.props;
    const self = this;
    if ( data ) {
      this.initData(data);
    } else if ( dataSourceId ) {
      request({
        url: `/api${dataSourceId}`,
        method: 'GET',
      }).then(
        function success(json) {
          const data = json.result;
          self.initData(data);
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tagSelected: nextProps.tagSelected,
      treeSelected: nextProps.treeSelected,
    });
  }

  initData(data) {
    const moreListVisibleMap = this.initMoreListVisibleMap(data);
    const { isSortByTagType } = this.props;
    if ( data && data.length ) {
      let dataCopy = data.slice();
      // 根据分组名在前端重新排序，对于服务端数据进行容错处理，确保同一个分组名的数据排列在数组内相邻的位置上
      if ( isSortByTagType ) {
        const groupArr = [];
        const map = {};
        let i = 0;
        const findGroupArrByKey = (key) => {
          if ( !map[key] ) {
            const newArr = [];
            map[key] = newArr;
            groupArr[i] = newArr;
            i++;
            return newArr;
          }
          return map[key];
        };
        for ( let i = 0; i < data.length; i++ ) {
          let dItem = data[i];
          const key = dItem.tagType || 'nullType';
          const arr = findGroupArrByKey(key);
          arr.push(dItem);
        }
        dataCopy = groupArr.reduce((acc, cur) => {
          return acc.concat(cur);
        }, []);
      }
      this.setState({
        data: dataCopy,
        moreListVisibleMap,
      });
    }
  }

  getCollapseActiveKey() {
    // 面板展开状态从props计算，只在页面进入时更新
    const { tagSelected } = this.props;
    return tagSelected
      .filter(it => {
        if ( it && it.values ) {
          return it.values.length > 0;
        }
        return true;
      })
      .map(it => it.key);
  }

  onTabChange(keys) {
    this.setState({
      activeTabKeys: keys
    });
  }

  // 全选
  onAllItemChange(type, key, text, newChecked) {
    const { data, tagSelected, treeSelected } = this.state;
    const newTagSelected = tagSelected.slice();
    // 查找待操作项目
    let changedItem = newTagSelected.find(it => it.key == key);
    const dataItem = data.find(it => it.key == key);
    if ( !changedItem ) {
      changedItem = {
        key,
        values: []
      };
      newTagSelected.push(changedItem);
    }
    // 全部勾选
    if ( newChecked ) {
      changedItem.values = dataItem.values.map(it => it.key);
    // 全部不选
    } else {
      changedItem.values = [];
    }

    this.setState({
      tagSelected: newTagSelected
    });
    // 树的全选/全不选
    if ( type == 'tree' ) {
      const newTreeSelected = Object.assign({}, treeSelected);
      // 全选/全不选，treeSelected传的值是true或false
      newTreeSelected[key] = newChecked;
      this.setState({
        treeSelected: newTreeSelected
      });
    }
    this.props.onAllItemChange(newTagSelected, key);
    this.props.onSelectChange(newTagSelected, key);
  }

  onItemChange(key, text, item) {
    const { tagSelected } = this.state;
    componentLog('你点击的项目: ', key, text, item);
    const checked = this.getSelectedByKey(key, item.key);
    const newTagSelected = tagSelected.slice();
    const newChecked = !checked;
    // 查找待操作项目
    let changedItem = newTagSelected.find(it => it.key == key);
    if ( !changedItem ) {
      changedItem = {
        key,
        values: []
      };
      newTagSelected.push(changedItem);
    }
    // 勾选
    if ( newChecked ) {
      changedItem.values.push(item.key);
    // 取消勾选
    } else {
      const index = changedItem.values.indexOf(item.key);
      changedItem.values.splice(index, 1);
    }

    this.setState({
      tagSelected: newTagSelected
    });
    this.props.onItemChange(newTagSelected, key);
    this.props.onSelectChange(newTagSelected, key);
  }

  // 树结构单选
  onTreeChanged(listKey, key, value, selectedItems) {
    const { tagSelected, treeSelected } = this.state;
    const newTagSelected = tagSelected.slice();
    // 查找待操作项目
    let changedItem = newTagSelected.find(it => it.key == listKey);
    if ( changedItem ) {
      changedItem.values = selectedItems.map(it => it.key);
    }

    const newTreeSelected = Object.assign({}, treeSelected);
    const changedTreeItem = newTreeSelected[listKey];
    if ( typeof changedTreeItem == 'object' ) {
      changedTreeItem[key] = value;
    }
    this.setState({
      treeSelected: newTreeSelected
    });
    this.props.onTreeChange(newTagSelected, listKey, selectedItems);
  }

  getTagContent(item) {
    // 支持的type类型：radio,checkbox,select,node
    switch (item.dataType) {
      case 'radio':
        return this.getRadio(item);
      case 'select':
        return this.getSelect(item);
      case 'tree':
        return this.getTree(item);
      default:
        return this.getSelect(item);
    }
  }

  getHeader = ({type, key, text, desc}) => {
    const { activeTabKeys } = this.state;
    const { checked, indeterminate } = this.getIndeterminateByKey(key);
    return (
      <div
        className={classNames({
          'm-tag-select-header': true,
          'z-expanded': activeTabKeys.includes(key),
        })}
      >
        <div className="m-tag-select-header-text-wrap">
          <span className="m-tag-select-header-text">{text || key || '暂无名称'}</span>
          <span className="m-tag-select-header-desc">{desc || '暂无描述'}</span>
        </div>
        <Checkbox
          className="m-tag-select-all-checkbox"
          checked={checked}
          indeterminate={indeterminate}
          onChange={(e) => this.onAllItemChange(type, key, text, e.target.checked)}
        >全选</Checkbox>
      </div>
    );
  };

  // 初始化显示更多勾选状态
  initMoreListVisibleMap (data) {
    const moreListVisibleMap = {};
    data.forEach((item) => {
      switch (item.dataType) {
        case 'select':
          // 默认显示前N项目，隐藏排在之后的项目
          moreListVisibleMap[item.key] = item.values && item.values.length <= TAG_LIST_MAX_LEN;
      }
    });
    return moreListVisibleMap;
  }

  setMoreList(key, value) {
    const { moreListVisibleMap } = this.state;
    this.setState({
      moreListVisibleMap: Object.assign(moreListVisibleMap, {
        [`${key}`]: value
      })
    });
  }

  // 获取子项目checked状态
  getSelectedByKey(key, subKey) {
    const { tagSelected } = this.state;
    const tag = tagSelected.find(it => it.key == key);
    if ( tag && tag.values && tag.values.length ) {
      return tag.values.includes(subKey);
    }
    return false;
  }

  // 获取父节点是否部分选中/全选/全不选的状态
  getIndeterminateByKey(key) {
    const { data, tagSelected } = this.state;
    const selectedTag = tagSelected.find(it => it.key == key);
    const dataTag = data.find(it => it.key == key);
    // 全不选
    if ( !selectedTag || !selectedTag.values || !selectedTag.values.length ) {
      return {
        checked: false,
        indeterminate: false,
      };
    }

    // 树结构特殊处理
    if ( dataTag.dataType == 'tree' ) {
      // 数结构以第一级value全等来判断全选
      let sTag = selectedTag.values;
      let findResult = dataTag.values.every((it, i) => {
        return it && it.key === sTag[i];
      });
      // 全选
      if ( findResult ) {
        return {
          checked: true,
          indeterminate: false,
        };
      }
    } else {
      // 全选
      if ( selectedTag.values.length == dataTag.values.length ) {
        return {
          checked: true,
          indeterminate: false,
        };
      }
    }

    // 部分选中
    return {
      checked: false,
      indeterminate: true,
    };
  }

  // 预留 radio类型
  getRadio(data) {
    return null;
  }

  // select类型
  getSelect(data) {
    // 渐变文本
    if (data.uiType == 'gradient') {
      return this.getGradientSelect(data);
    }
    // icon + 文本
    if (data.uiType == 'icon-text') {
      return this.getIconTextSelect(data);
    }
    // 纯文本展示
    return this.getTextSelect(data);
  }

  getGradientSelect(data) {
    const listName = data.text;
    const listKey = data.key;
    let dataUiColor = [];
    if ( data.uiValue ) {
      dataUiColor = colorSplit(data.uiValue.start, data.uiValue.end, data.values.length);
    }
    const list = data.values.map((item, i) => {
      item.bg = dataUiColor[i] || 'transparent';
      return item;
    });
    return (
      <div className="m-tag-select m-tag-select-gradient">
        <ul className="clearfix">
          {
            list.map((item, len) => {
              const checked = this.getSelectedByKey(listKey, item.key);
              return (
                <li key={item.key} style={{backgroundColor: item.bg}}
                    className={classNames({current: checked})}
                    onClick={() => this.onItemChange(listKey, listName, item)}>
                  { checked ? <Checkbox checked={true} /> : null }
                  <span className="m-tag-select-gradient-text">{item.text}</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

  getIconTextSelect(data) {
    const listName = data.text;
    const listKey = data.key;
    const list = data.values.map((item) => {
      if ( Array.isArray(data.uiValue) ) {
        const icon = data.uiValue.find((uiItem) => {
          return uiItem.key === item.key;
        });
        item.iconDefault = icon && icon.iconDefault || ICON_DEFAULT;
        item.iconCurrent = icon && icon.iconCurrent || ICON_CURRENT;
      } else {
        item.iconDefault = ICON_DEFAULT;
        item.iconCurrent = ICON_CURRENT;
      }
      return item;
    });
    return (
      <div className="m-tag-select m-tag-select-icontext">
        <ul className="clearfix">
          {
            list.map((item, len) => {
              const checked = this.getSelectedByKey(listKey, item.key);
              const icon = checked ? item.iconCurrent : item.iconDefault;
              return (
                <li key={item.key}
                    onClick={() => this.onItemChange(listKey, listName, item)}
                    className={classNames({current: checked})}
                >
                  {checked ? <Checkbox defaultChecked={true} /> : null}
                  <div className="m-tag-select-icontext-img"
                       style={{backgroundImage: icon ? `url("${icon}")` : 'none'}} />
                  {item.text && item.text.length > 4 ?
                    <Tooltip placement="bottom" title={item.text}>
                      <span className="m-tag-select-icontext-text">{item.text}</span>
                    </Tooltip> :
                    <span className="m-tag-select-icontext-text">{item.text}</span>
                  }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

  getTextSelect(data) {
    const { moreListVisibleMap } = this.state;
    const listName = data.text;
    const listKey = data.key;
    const isNeedFilter = this.isNeedFilterTagValue(listKey);
    let list = this.getFilteredTagValue(listKey, data.values);
    let moreList = [];
    const listLen = data.values.length;
    const isShowMoreList = listLen > TAG_LIST_MAX_LEN;
    if (!listLen) {
      return null;
    // 超过固定个数显示更多
    } else if (isShowMoreList) {
      moreList = list.slice(TAG_LIST_MAX_LEN, listLen);
      list = list.slice(0, TAG_LIST_MAX_LEN);
    }
    return (
      <div className="m-tag-select m-tag-select-puretext">
        {
          listLen > TAG_FILTER_LIMIT ?
            <TagFilter
              prefixCls="m-tag-select-minor"
              placeholder="请输入关键字搜索"
              size="small"
              onSearch={(keywords) => this.handleTagValueFilter(listKey, keywords)}
            /> : null
        }
        {
          list.length === 0 ?
            <div className="no-result">
              很抱歉，没有搜索到您要的内容
            </div> :
            <ul className="clearfix">
              {
                list.map((item) => {
                  return (
                    <PureItem
                      key={item.key}
                      visible={true}
                      checked={this.getSelectedByKey(listKey, item.key)}
                      item={item}
                      onItemChange={(item) => this.onItemChange(listKey, listName, item)}
                    />
                  );
                })
              }
              {
                moreList.map((item) => {
                  return (
                    <PureItem
                      key={item.key}
                      visible={moreListVisibleMap[listKey]}
                      checked={this.getSelectedByKey(listKey, item.key)}
                      item={item}
                      onItemChange={(item) => this.onItemChange(listKey, listName, item)}
                    />
                  );
                })
              }
            </ul>
        }
        {
          isNeedFilter ? null :
            <div className="m-tag-select-puretext-more"
                 style={{ display: moreListVisibleMap[listKey] ? 'none' : 'block' }}
                 onClick={() => this.setMoreList(listKey, true)}>查看更多</div>
        }
      </div>
    );
  }

  // tree类型
  getTree(data) {
    const { treeSelected } = this.state;
    const { tagSelected } = this.props;
    const list = data.values;
    const listName = data.text;
    const listKey = data.key;
    const defaultSelectedMap = {};
    // 过滤非树数据的defaultData
    const defaultSelected = tagSelected.find(it => it.key == listKey);
    if ( defaultSelected ) {
      defaultSelected.values.forEach(val => defaultSelectedMap[val] = true);
    }
    return (
      <div className="m-tag-select-tree">
        <TreeSelect
          multiple={true}
          data={list}
          defaultSelectedMap={defaultSelectedMap}
          selectedObj={treeSelected[listKey]}
          onSelect={(selectedItems, key, value) => this.onTreeChanged(listKey, key, value, selectedItems)}
        />
      </div>
    );
  }

  // 停用后的标签不在界面上显示
  getFilteredTag = () => {
    const { data, filterTagKeywords } = this.state;
    const enableData = data.filter(filterEnabledTag);
    if (!filterTagKeywords) {
      return enableData;
    }
    const kws = filterTagKeywords.trim();
    const filtered = enableData.filter(getFilterTagKeywords(['text', 'key'], kws));
    return filtered;
  };

  handleTagFilter = (keywords) => {
    this.setState({
      filterTagKeywords: keywords
    });
  };

  // 当前标签是否需要过滤结果
  isNeedFilterTagValue = (key) => {
    const { filterTagValue } = this.state;
    return filterTagValue.key === key && filterTagValue.keywords;
  }

  // 停用后的标签不在界面上显示
  getFilteredTagValue = (key, data) => {
    const { filterTagValue } = this.state;
    if (!this.isNeedFilterTagValue(key)) {
      return data;
    }
    const kws = filterTagValue.keywords.trim();
    const filtered = data.filter(getFilterTagKeywords(['text', 'key'], kws));
    return filtered;
  };

  handleTagValueFilter = (key, keywords) => {
    this.setState({
      filterTagValue: {
        key,
        keywords,
      }
    });
  };

  render() {
    const { data } = this.state;
    const { isSortByTagType, className, noDataResult, noFilteredResult } = this.props;
    const defaultActiveKeys = this.getCollapseActiveKey();
    componentLog('--------TagSelect render-----------');
    let lastRenderTagType = null;
    const filteredData = this.getFilteredTag();
    const enabledData = data.filter(filterEnabledTag);
    // 初始化数据无结果
    const isDataNoResult = !enabledData || enabledData.length === 0;
    // 搜索无结果
    const isFilteredNoResult = !filteredData || filteredData.length === 0;
    return (
      <div>
        {
          enabledData && enabledData.length > TAG_FILTER_LIMIT ?
            <TagFilter
              prefixCls="m-tag-select-main"
              placeholder="请输入标签名称搜索"
              onSearch={this.handleTagFilter}
              enterButton={true}
            /> : null
        }
        {
          isDataNoResult ? noDataResult : (
            isFilteredNoResult ? noFilteredResult : <Collapse
              defaultActiveKey={defaultActiveKeys}
              onChange={this.onTabChange}
              extraCls={classNames(isSortByTagType ?
                'm-tag-select-collapse m-tag-select-group' : 'm-tag-select-collapse', className)}
              isScrollToHeader
            >
              {
                filteredData
                  .map((item, i, arr) => {
                    const returned = [];
                    let cls;
                    // 构造标签分组的样式
                    if ( isSortByTagType ) {
                      if ( item.tagType != lastRenderTagType ) {
                        returned.push(
                          <TagType
                            tagType={item.tagType}
                          />
                        );
                        lastRenderTagType = item.tagType;
                      }
                      const nextItem = arr[i + 1];
                      if ( !nextItem || nextItem.tagType != lastRenderTagType ) {
                        cls = 'm-collapse-item-group-last';
                      }
                    }
                    returned.push(
                      <CollapsePanel
                        header={this.getHeader(item)}
                        key={item.key}
                        className={cls}
                      >
                        {this.getTagContent(item)}
                      </CollapsePanel>
                    );
                    return returned;
                  })
              }
              <Total
                total={filteredData.length}
                className="m-tag-select-total-group"
              />
            </Collapse>
          )
        }
      </div>
    );
  }
}

export default TagSelect;
