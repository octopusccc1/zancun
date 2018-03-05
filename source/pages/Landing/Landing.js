import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Landing.less';
import MainLayout from '../MainLayout';
import InsightItem from './components/InsightItem';
import {menu} from '../../constants';
import {Button, BackTop, Col} from 'antd';
import Loading from 'ppfish/source/components/Loading';
import empty from '../../assets/image/empty@2x.png';

class App extends Component {

  static propTypes = {
    totalNum: PropTypes.number,
    list: PropTypes.array,
    offset: PropTypes.number,
    allLoaded: PropTypes.bool,
    isInsightLoading: PropTypes.bool,
    deleteInsight: PropTypes.func,
    editInsight: PropTypes.func,
    loadInsight: PropTypes.func,
    setTotalNum: PropTypes.func
  };

  static defaultProps = {
    totalNum: 0,
    list: [],
    offset: 0,
    allLoaded: false,
    isInsightLoading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading: true
    };
    // 设置面包屑
    this.breadcrumb = [{
      text: '客群洞察'
    }];
    this.props.totalNum > 0 && this.loadInsight();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isInsightLoading && this.state.isFirstLoading) {
      this.setState({
        isFirstLoading: false
      });
    }
  }

  loadInsight = () => {
    const {loadInsight, offset} = this.props;
    loadInsight(offset);
  };

  getInsightPage() {
    const {list, totalNum, isInsightLoading, allLoaded, deleteInsight, editInsight} = this.props;
    const header = (
      <div className="insight-hd">
        <h3>客群洞察</h3>
        <p>共 {totalNum} 个洞察</p>
        <a href="/insight/create/">
          <Button type="primary" className="u-btn-create" size="large">
            创建洞察
          </Button>
        </a>
      </div>
    );
    const loadBtn = (
      <div className="u-load-more ant-col-24" key="loadbtn">
        {allLoaded ?
          <span className="no-more">没有更多了</span>
          :
          <Button loading={isInsightLoading} onClick={this.loadInsight}
                  className="u-btn-loadmore"
                  size="large">
            查看更多
          </Button>
        }
      </div>
    );
    if (totalNum > 0) {
      return (
        <div className="m-insight-landing" ref="list">
          {this.state.isFirstLoading ? <Loading/> :
            [<div key="insight-list">
              {header}
              <div className="insight-bd">
                {list.map((insightItem) =>
                  <Col span={12} xxl={8} key={insightItem.id}>
                    <InsightItem
                      {...insightItem}
                      editInsight={editInsight}
                      deleteInsight={deleteInsight}
                    />
                  </Col>
                )}
              </div>
            </div>, loadBtn]
          }
        </div>
      );
    } else {
      return (
        <div className="m-insight-empty" ref="list">
          <img src={empty} alt="当前没有洞察"/>
          <p>当前暂无洞察</p>
          <a href="/insight/create/">
            <Button className="u-btn-create-empty" type="primary" size="large">
              创建洞察
            </Button>
          </a>
        </div>
      );
    }
  }

  render() {
    return (
      <MainLayout isCheckLogin={true} menu={menu.LANDING} breadcrumb={this.breadcrumb}>
        {this.getInsightPage()}
        <BackTop target={() => this.refs.list} key="insight-backToTop"/>
      </MainLayout>
    );
  }
}

export default App;

