import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, Modal, Tooltip} from 'antd';
import InsightEditModal from '../InsightEditModal';
import DropDownList from '../DropDownList';
import {getTimeStamp, formatUnit, deepTrim, distinguishTagType} from '../../../../utils';
import {INSIGHT_ICON_DEFAULT} from '../../../../constants';
import './index.less';

const confirm = Modal.confirm;

class InsightItem extends Component {
  static propTypes = {
    iconUrl: PropTypes.string,
    id: PropTypes.number,
    source: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    timestamp: PropTypes.number,
    insightTags: PropTypes.array,
    conditionList: PropTypes.array,
    deleteInsight: PropTypes.func,
    editInsight: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleDeleteInsight = () => {
    const {deleteInsight, id} = this.props;
    confirm({
      title: '您确定删除该洞察吗？删除后将不可恢复。',
      okText: '删除',
      cancelText: '取消',
      onOk() {
        deleteInsight(id);
      }
    });
  };

  handleEditInsight(values) {
    const {editInsight, id} = this.props;
    editInsight(id, values, () => {
      this.setState({visible: false});
      this.form.resetFields();
    });
  }

  showModal = () => {
    this.setState({visible: true});
  };

  handleCancel = () => {
    this.setState({visible: false});
    this.form.resetFields();
  };

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      deepTrim(values);
      this.handleEditInsight(values);
    });
  };

  getItemHeader() {
    const {name, description, quantity, timestamp, source, conditionList} = this.props;
    let index = source;
    if(index === 1 && conditionList){
      // 标签创建有两种方式：公共标签 and 私有标签
      index = distinguishTagType(conditionList);
    }
    const SOURCE = {type: '', landing_image: INSIGHT_ICON_DEFAULT};
    const {type, landing_image} = SOURCE;
    const tooltip = `基于${type}创建洞察`;
    return (
      <div className="insight-item-hd">
        <div className="u-img-wrapper">
          <Tooltip placement="bottom" title={tooltip}>
            <img src={landing_image} alt="logo"/>
          </Tooltip>
        </div>
        <div className="u-text-wrapper">
          <div className="title">
            <Tooltip placement="bottom" title={name}>
              <h3 className="u-tlt">{name}</h3>
            </Tooltip>
            <i className="iconfont icon-bianji u-icon-edit" onClick={this.showModal}/>
            <InsightEditModal
              ref={(form) => this.form = form}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              name={name}
              description={description}
            />
          </div>
          <div className="u-list-item">
            <span className="content-title">描<span style={{float: 'right'}}>述</span></span>
            <p className="content">
              <Tooltip placement="bottom" title={description}>
                <span>{description}</span>
              </Tooltip>
            </p>
          </div>
          <div className="u-list-item">
            <span className="content-title">客群量</span>{formatUnit(quantity)}
          </div>
          <div className="u-list-item">
            <span className="content-title">时<span style={{float: 'right'}}>间</span></span>{getTimeStamp(timestamp)}
          </div>
        </div>
      </div>
    );
  }

  getItemBody() {
    const { conditionList } = this.props;
    return (
      <div className="insight-item-bd">
        <DropDownList list={conditionList} title="客群属性"/>
      </div>
    );
  }

  getItemFooter() {
    const {id, source, conditionList} = this.props;
    let index = source;
    if(index === 1 && conditionList){
      // 标签创建有两种方式：公共标签 and 私有标签
      index = distinguishTagType(conditionList);
    }
    const redirectHref = '#';
    return (
      <div className="insight-item-ft">
        <a href={redirectHref} className="u-goInsight">进入洞察
          <i className="iconfont icon-youjiantou u-insight-arrow"/>
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="u-insight-item">
        <Icon type="close" className="close-icon" onClick={this.handleDeleteInsight}/>
        {this.getItemHeader()}
        {this.getItemBody()}
        {this.getItemFooter()}
      </div>
    );
  }
}

export default InsightItem;


