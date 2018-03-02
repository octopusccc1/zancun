import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, Checkbox, Tooltip, Icon, message } from 'antd';
import classNames from 'classnames';
import { radiusFormat } from '../../../utils/number';
import NumberCounter from '../../../components/NumberCounter';
import { request } from '../../../utils';
import deepEqual from 'deep-equal';
import axios from 'axios';

import './ConditionChoose.less';

const CancelToken = axios.CancelToken;

//预估客群取消钩子
let lastEstimeateId = null;

//过滤掉已停用项, 没有status字段代表默认未停用
const filterEnabledCondition = (item) => {
  return item.status !== 0;
};

//过滤掉没有选中的项, 没有checked字段代表默认选中
const filterCheckedCondition = (item) => {
  return item.isChecked !== false;
};

const setConditionOptionStatus = (conditionOptions, item, status) => {
  const newConditionOptions = [];
  for(let each of conditionOptions){
    if(item){
      if(each.id === item.id){
        each.isChecked = status;
      }
    }else{
      each.isChecked = status;
    }
    newConditionOptions.push(each);
  }
  return newConditionOptions;
};

class ConditionChoose extends React.Component {
  static propTypes = {
    pageTag: PropTypes.string,
    estimateType: PropTypes.string,
    buttonText: PropTypes.string,
    conditionOptions: PropTypes.array,
    customerGroupForm: PropTypes.object,
    conditionOptionsChanged: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    pageTag: 'CUSTOMER',
    estimateType: '',
    buttonText: '保存',
    conditionOptions: [],
    customerGroupForm: {},
    conditionOptionsChanged: () => {},
    onSubmit: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      //预估人数
      quantity: null,
      //是否正在加载预估人数，notStart-未开始加载，loading-加载中，loaded-加载完成
      quantityLoadStatus: 'notStart',
    };
  }

  componentDidMount(){
    const { conditionOptions, customerGroupForm } = this.props;
    this.updateUsersNum(customerGroupForm, conditionOptions);
  }

  componentWillReceiveProps(nextProps) {
    if(!deepEqual(this.props.customerGroupForm, nextProps.customerGroupForm)){
      this.updateUsersNum(nextProps.customerGroupForm, nextProps.conditionOptions);
    }
  }

  //更新预估人数函数
  updateUsersNum(customerGroupForm, conditionOptions){
    if ( typeof lastEstimeateId == 'function' ) {
      lastEstimeateId();
      this.setState({
        quantityLoadStatus: 'notStart'
      });
    }

    //首先过滤掉禁用的项
    const enableConditionOptions = conditionOptions.filter(filterEnabledCondition);
    //选中的列表
    const checkedCustomerList = enableConditionOptions ? enableConditionOptions.filter(filterCheckedCondition) : [];
    //特殊处理：存在私有标签时，因为后端无法预估，所以不发预估请求
    if(checkedCustomerList.filter(i => i.isPrivate).length > 0){
      this.setState({
        quantity: null,
        quantityLoadStatus: 'loaded'
      });
    }else if(checkedCustomerList.length === 0){
      this.setState({
        quantity: null,
        quantityLoadStatus: 'notStart'
      });
    }else{
      const { estimateType } = this.props;
      const ajaxUrl = `/api/prophet/${estimateType}/estimate`;
      this.setState({
        quantityLoadStatus: 'loading'
      });
      request({
        url: ajaxUrl,
        method: 'POST',
        data: customerGroupForm,
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          lastEstimeateId = c;
        }),
      }).then(
        (json) => {
          lastEstimeateId = null;
          if(json.code === 200){
            this.setState({
              quantityLoadStatus: 'loaded',
              quantity: json.result
            });
          }
        },
        (json) => {
          lastEstimeateId = null;
          message.error(json.result);
          this.setState({
            quantityLoadStatus: 'loaded',
          });
        }
      );
    }
  }

  //点击全选按钮
  handleCheckAllChange = (e) => {
    const { conditionOptions } = this.props;
    const newConditionOptions = e.target.checked ? setConditionOptionStatus(conditionOptions, null, true) : setConditionOptionStatus(conditionOptions, null, false);
    //更新条件列表
    this.props.conditionOptionsChanged(newConditionOptions);
  }

  //点击每个项目的Checkbox
  handleChangeCheckbox(item, e) {
    const { conditionOptions } = this.props;
    const newConditionOptions = e.target.checked ? setConditionOptionStatus(conditionOptions, item, true) : setConditionOptionStatus(conditionOptions, item, false);
    //更新条件列表
    this.props.conditionOptionsChanged(newConditionOptions);
  }

  //点击每个列表项目的关闭按钮
  handleCloseTag(item) {
    const { conditionOptions } = this.props;
    const newConditionOptions = conditionOptions.filter(i => i.id !== item.id);
    //更新条件列表
    this.props.conditionOptionsChanged(newConditionOptions);
  }

  //点击清空按钮
  handleClear = () => {
    //更新条件列表
    this.props.conditionOptionsChanged([]);
  }

  //点击确定提交保存
  handleClickButton = () => {
    this.props.onSubmit(this.state.quantity);
  }

  render() {
    const { quantity, quantityLoadStatus } = this.state;
    const { buttonText, conditionOptions, pageTag } = this.props;
    //首先过滤掉禁用的项
    const enableConditionOptions = conditionOptions.filter(filterEnabledCondition);
    //选中的列表
    const checkedList = enableConditionOptions ? enableConditionOptions.filter(filterCheckedCondition) : [];
    //全选样式
    const indeterminate = !!checkedList.length && (checkedList.length < enableConditionOptions.length);
    //是否全选
    const checkAll = !!enableConditionOptions.length && (enableConditionOptions.length === checkedList.length);
    //选中的可用的个数
    const enabledNum = checkedList.length;
    //提交按钮是否禁用
    let btnDisabled = enabledNum === 0;
    if ( quantityLoadStatus !== 'loaded' || typeof quantity !== 'number' && checkedList.filter(i=>i.isPrivate).length === 0 || pageTag === 'INSIGHT' && quantity < 1000) {
      btnDisabled = true;
    }
    //用户数加载状态
    const getLoadText = (quantityLoadStatus, quantity) => {
      return (
        <span>
          {
            (quantityLoadStatus === 'notStart' || typeof quantity !== 'number')
            ? '--'
            :
            <NumberCounter
              value={parseInt(quantity, 10) || 0}
              commas={true}
              timeout={500}
            />
          }
          <span style={{fontSize: 12}}>{quantityLoadStatus === 'loading' ? ' (预估中...)' : ''}</span>
        </span>
      );
    };

    return (
      <div className="m-condition-choose">
        <div className="m-hd">
          <div className="infor">
            <div className="text">预计覆盖最大用户
              {
                pageTag === 'INSIGHT'
                ?
                <Tooltip placement="bottom" title={'预计覆盖最大用户量必须超过1000'}>
                  <Icon type="question-circle-o"  style={{marginLeft: 5}} />
                </Tooltip>
                :
                <Tooltip placement="bottom" title={'已选条件如果含有私有标签，将无法预估客群量'}>
                  <Icon type="question-circle-o"  style={{marginLeft: 5}} />
                </Tooltip>
              }
            </div>
            <div className="num">
              {getLoadText(quantityLoadStatus, quantity)}
            </div>
          </div>

          <div className="operate">
            <div className="select-all">
              <Checkbox
                indeterminate={indeterminate}
                checked={checkAll}
                disabled={enableConditionOptions===0}
                onChange={this.handleCheckAllChange}
              >
                <span className="select-all-text">全选</span>
                <span className="select-all-count">({enabledNum}个)</span>
              </Checkbox>
            </div>
            <div className="clear-all">
              <a className="clear-all-text" disabled={conditionOptions.length===0} onClick={this.handleClear}>清空</a>
            </div>
          </div>
        </div>

        <div className="m-bd">
          {
            conditionOptions.map((item, index) => {
              const disabled = item.status === 0;
              const checked = (item.isChecked || item.isChecked === undefined) && !disabled;
              const cls = classNames({
                'item': true,
                'item-dis': disabled
              });
              return (
                <div className={cls} key={index}>
                  <Tag className="item-tag"
                       key={item.id}
                       closable
                       onClose={this.handleCloseTag.bind(this,item)}
                  >
                    <div className="item-left">
                      <Checkbox
                        disabled={disabled}
                        checked={checked}
                        onChange={this.handleChangeCheckbox.bind(this,item)}
                      >
                        <Tooltip placement="bottom" title={item.name}>
                          {item.name}
                        </Tooltip>
                      </Checkbox>
                    </div>
                    { item.isPrivate ? <div className="item-right private-tag">私</div> : null }
                    { item.radius ? <div className="item-right">{radiusFormat(parseInt(item.radius))}</div> : null }
                  </Tag>
                </div>
              );
            })
          }
        </div>

        <div className="m-ft">
            <Button
              className="u-btn"
              disabled={btnDisabled}
              onClick={this.handleClickButton}>
              <span>
                {buttonText}
              </span>
            </Button>
        </div>
      </div>
    );
  }
}

export default ConditionChoose;
