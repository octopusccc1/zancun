import React, { Component,Fragment } from 'react';
import { Card, Badge, Table, Divider,Icon ,Row,Col} from 'ppfish';
import './AdvancedDetail.less';
//3个为一组
const groupNew = (arr) => {
	let groupArr = [];
	for (let i = 0, len = arr.length; i < len; i += 3) {
		groupArr.push(arr.slice(i, i + 3));
	}
	return groupArr;
};
class AdvancedDetail extends Component {
  
  render() {
    const data1 = [{
      name:'取货单号',
      value:'1000000000'
    },{
      name:'状态',
      value:'已取货'
    },{
      name:'销售单号',
      value:'	1234123421'
    },{
      name:'取货地址',
      value:'浙江省杭州市'
    },{
      name:'备注',
      value:'无'
    }];
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '15%',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
    }, {
      title: 'Action',
      key: 'action',
      width: '40%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.handleModal}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Divider type="vertical" />
          <a href="javascript:;" className="fishd-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];
        const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },{
      key: '4',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },{
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },{
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },{
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
   return(
     <Fragment>
       <div className="u-detail-top">
       {
         groupNew(data1).map((r,k)=>
          <Row className="u-detail-row" gutter={20} key={k}>
            {
              r.map((it,i)=>
                <Col span={8} key={i}>
                  <span>{it.name}:</span>
                  <span>{it.value}</span>
                </Col>
              )
            }
          </Row>
         )
       }
      </div>
      <div className="u-detail-top">
       {
         groupNew(data1).map((r,k)=>
          <Row className="u-detail-row" gutter={20} key={k}>
            {
              r.map((it,i)=>
                <Col span={8} key={i}>
                  <span>{it.name}:</span>
                  <span>{it.value}</span>
                </Col>
              )
            }
          </Row>
         )
       }
      </div>
      <div className="u-detail-top" style={{marginBottom:'15px'}}>
       {
         groupNew(data1).map((r,k)=>
          <Row className="u-detail-row" gutter={20} key={k}>
            {
              r.map((it,i)=>
                <Col span={8} key={i}>
                  <span>{it.name}:</span>
                  <span>{it.value}</span>
                </Col>
              )
            }
          </Row>
         )
       }
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 'calc( 100vh - 313px )' }}
            />
     </Fragment>
   )
  }
}

export default AdvancedDetail;
