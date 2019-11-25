import React, { Component } from 'react'
import { Card, Icon, Button, Table} from 'antd';
import { connect } from 'react-redux'
import{getCategoriesAsync}from '../../redux/action-creator/categories'



@connect(
    (state) => ({ categories: state.categories }),
    {getCategoriesAsync}
)
class Category extends Component {

    componentDidMount() {
        this.props.getCategoriesAsync()
        
    }

    columns = [
        {
            title: '品类名称',//表头
            dataIndex: 'name',//找data里面的key,取value的值
            //默认情况下表内数据为纯文本,可以指定表内数据如何渲染
            // render: text => <a href="##">{text}</a>,
        },
        {
            title: '操作',
            //dataIndex: 'money',
            render: () => {
                return <div>
                    <Button type="link">修改分类</Button>
                    <Button type="link">删除分类</Button>
                </div>
            }
        },

    ]

   
    render() {
        const {categories} = this.props
        return (
            <Card title="分类列表"
                extra={
                    <Button type="primary">
                        <Icon type="plus" />
                        分类列表
                    </Button>}>
                <Table columns={this.columns}
                        dataSource={categories} //这里将请求回来的数据进行展示
                        bordered rowKey="_id" 
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            pageSizeOptions:[
                               '3','6,','9'
                            ],
                            defaultPageSize:3
                    }}
                        
                />
            </Card>
        )
    }
}


export default  Category