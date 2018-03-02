import React, { Component } from 'react';
import './App.less';
import TagSelect from '../index';
import { Checkbox, Button } from 'antd';

// 按照给定数据展示
const data = [
  {
    key: 'online',
    text: '上网活跃度',
    dataType: 'select',
    tagType: '用户兴趣',
    uiType: 'gradient',
    uiValue: {
      start: '#8d94a1',
      end: '#f5f5f5'
    },
    value: [
      {key:'b1', text: '不活跃', value: []},
      {key:'b2', text: '不太活跃', value: []},
      {key:'b3', text: '不太活跃', value: []},
      {key:'b4', text: '不太活跃', value: []},
      {key:'b5', text: '非常活跃', value: []}
    ]
  },
  {
    key: 'age',
    text: '年龄',
    dataType: 'select',
    tagType: '人口属性',
    uiType: 'text',
    uiValue: '',
    value: [{key:'a1', text: '20-25', value: []}, {key:'a2', text: '266-300', value: []},
      {key:'a3', text: '2666-3000', value: []}, {key:'a4', text: '2666666666-3000000000', value: []}]
  },
  {
    key: 'constellation',
    text: '星座',
    dataType: 'select',
    tagType: '用户兴趣',
    uiType: 'icon-text',
    uiValue: [{
      icon: 'tt1.png',
      text: '巨蟹',
      key: 'a5'
    }, {
      icon: 'tt2.png',
      text: '摩羯',
      key: 'a6'
    }],
    value: [{key:'a7', text: '巨蟹', value: []}, {key:'a8', text: '摩羯', value: []}]
  },
  {
    key: 'city',
    text: '户籍城市',
    dataType: 'tree',
    tagType: '人口属性',
    uiValue: '', // uiValue为空
    uiType: '', // uiType为空
    value: [
      {
        text: '浙江',
        key: '232ddsds',
        value: [
          {
            text: '杭州',
            key: '232ddsd1',
            value: [
              {
                text: '萧山',
                key: 'kk12111',
                value: []
              },
              {
                text: '滨江',
                key: 'kk12112',
                value: []
              },
              {
                text: '下沙',
                key: 'kk12113',
                value: []
              }
            ]
          },
          {
            text: '温州',
            key: '232ddsd2',
            value: []
          },
          {
            text: '金华',
            key: '232ddsd3',
            value: []
          }
        ]
      },
      {
        text: '江西',
        key: '13232dad1',
        value: [
          {
            text: '南昌',
            key: '13232dad2',
            value: []
          },
          {
            text: '赣州',
            key: '13232dad3',
            value: []
          },
          {
            text: '合肥',
            key: '13232dad4',
            value: []
          }
        ]
      }
    ]
  }
];
const tagSelected = [{
  key: 'age',
  values: ['a1']
}, {
  key: 'constellation',
  values: []
}, {
  key: 'online',
  values: ['b2']
},{
  key: 'city',
  values: ['13232dad2', '13232dad3', '13232dad4']
}];
const treeSelected = {
  city: {
    '13232dad2': true,
    '13232dad3': true,
    '13232dad4': true,
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTagSelectChange = this.handleTagSelectChange.bind(this);
    this.handleTagTreeChange = this.handleTagTreeChange.bind(this);
    this.state = {
      tagSelected,
      treeSelected,
      tagChanged: [],
    };
  }

  handleAllChange(key, checked) {
    const { tagSelected } = this.state;
    const newTagSelected = tagSelected.slice();
    let tagItem = newTagSelected.find(it => it.key == key);
    const dataItem = data.find(it => it.key == key);
    if (!tagItem) {
      tagItem = {
        key,
        values: []
      };
    }
    if ( checked ) {
      tagItem.values = dataItem.value.map(it => it.key);
    } else {
      tagItem.values = [];
    }

    this.setState({
      tagSelected: newTagSelected
    });
  }

  handleChange(key, value, checked) {
    const { tagSelected, treeSelected } = this.state;
    const newTagSelected = tagSelected.slice();
    const newTreeSelected = Object.assign({}, treeSelected);
    let changedItem = newTagSelected.find(it => it.key == key);
    if ( !changedItem ) {
      changedItem = {
        key,
        values: []
      };
      newTagSelected.push(changedItem);
    }
    if ( changedItem ) {
      if ( checked ) {
        changedItem.values.push(value);
      } else {
        const index = changedItem.values.indexOf(value);
        changedItem.values.splice(index, 1);
      }
    }

    // 树结构数据变动，简单写法，当全选时这样写会有问题
    if ( key == 'city' ) {
      newTreeSelected[key][value] = checked;
    }

    this.setState({
      tagSelected: newTagSelected,
      treeSelected: newTreeSelected,
    });
  }

  handleTagSelectChange(tagChanged, key) {
    this.handleTagChange(tagChanged, key);
  }

  handleTagTreeChange(tagChanged, key) {
    this.handleTagChange(tagChanged, key);
  }

  handleTagChange(tagChanged, key, selectedItems) {
    // 遍历找到树结构的数据，生成treeSelected
    const itemKey = key;
    const itemValue = tagChanged.find(it => it.key == itemKey).values;
    const dataTag = data.find(it => it.key == itemKey);
    const newItem = {};
    const treeSelected = {};
    // 这里省略遍历
    // ...
    if ( dataTag.dataType == 'tree' ) {
      // 树结构以第一级value全等来判断全选
      let findResult = true;
      let len = dataTag.value.length;
      while (len--) {
        let dItem = dataTag.value[len];
        if ( !dItem ) {
          findResult = false;
          break;
        }
        if ( !itemValue[len] || itemValue[len].key != dItem.key ) {
          findResult = false;
          break;
        }
      }
      // 全不选
      if ( !itemValue || !itemValue.length ) {
        newItem[itemKey] = false;
        // 全选
      } else if ( findResult ) {
        newItem[itemKey] = true;
      } else {
        itemValue.forEach(it => {
          treeSelected[it] = true;
        });
        newItem[itemKey] = treeSelected;
      }
    }
    this.setState({
      tagChanged,
      treeSelected: newItem
    });
  }

  render() {
    const { tagSelected, treeSelected, tagChanged } = this.state;
    return (
      <div style={{ margin: 50 }}>
        <TagSelect
          data={data}
          tagSelected={tagSelected}
          treeSelected={treeSelected}
          isSortByTagType={true}
          onItemChange={(key, text, item) => ()=>{}}
          onAllItemChange={(key, text, checked) => ()=>{}}
          onSelectChange={this.handleTagSelectChange}
          onTreeChange={this.handleTagTreeChange}
        />
        <div style={{ margin: 50 }}>
          修改checkbox看看，
          <Checkbox defaultChecked={true} onChange={(e) => this.handleChange('age', 'a1', e.target.checked)}>年龄：20-25</Checkbox>
          <Checkbox defaultChecked={true} onChange={(e) => this.handleChange('online', 'b2', e.target.checked)}>上网活跃度：不太活跃</Checkbox>
          <Checkbox defaultChecked={true} onChange={(e) => this.handleChange('city', '13232dad2', e.target.checked)}>户籍城市：南昌</Checkbox>
        </div>
        <div style={{ margin: 50 }}>
          全选：
          <Checkbox defaultChecked={true} onChange={(e) => this.handleAllChange('age', e.target.checked)}>年龄</Checkbox>
        </div>
        <div style={{ margin: 50 }}>
          <span>
            {tagChanged.map((tag) => {
              return (
                <span style={{ marginRight: 10 }} key={tag.key}>{tag.key}: {JSON.stringify(tag.values)}</span>
              );
            })}
          </span>
        </div>
      </div>
    );
    // return (
    //   <div style={{ margin: 100 }}>
    //     <TagSelect
    //       dataSourceId="/tagging/tag/list/customer_group"
    //     />
    //   </div>
    // );
  }
}

export default App;
