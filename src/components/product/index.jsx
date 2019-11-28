import React, { Component } from 'react';
import { Card, Table, Select, Input, Button, Icon, message } from 'antd';
import { reqGetProducts, reqUpdateProductStatus, reqSearchProductStatus } from '../../api'
import './index.less'



export default class Product extends Component {

    state = {
        products: [],
        total: 0,
        searchType: "productName",
        searchValue: "",
        current: 1,
        pageSize: 3,
       
    }

    isSearch = false;
    currentSearchValue = '';

    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '状态',
            //dataIndex: 'status',
            render: (product) => {
                const status = product.status
                return <div>
                    <Button type="primary" onClick={this.updateProductStatus(product)}>{status === 1 ? "上架" : "下架"}</Button>
                    {status === 1 ? "已下架" : "已上架"} {/* 这里代表商品当前的状态,上面代表切换商品的状态 */}
                </div>
            }
        },
        {
            title: '操作',
            render: product => {
                return <div>
                    <Button type="link" onClick={this.showProductDetail(product)}>详情</Button>
                    <Button type="link" onClick={this.showUpdateProduct(product)}>修改</Button>
                </div>
            }
        },
    ];


    //关键字 搜索按钮的事件
    search = () => {
        const { current, pageSize, searchValue } = this.state
        this.isSearch = true;
        this.currentSearchValue = searchValue;
        this.getProducts(current, pageSize) 
    }

    

    //关键字表单的onChange事件
    inputChange = (e) => {
        this.setState({
            searchValue: e.target.value.trim()
        })
    }

    //上架/下架按钮的状态
    updateProductStatus = (product) => {
        return () => {//在这里要发送请求,请求需要两个参数,所以先取到需要的参数
            const productId = product._id
            const status = 3 - product.status
            reqUpdateProductStatus(productId, status)
                .then((res) => {
                    message.success("更新状态成功")
                    this.setState({
                        products: this.state.products.map((product) => {
                            if (product._id === productId) {
                                return { ...product, status }
                            }
                            return product
                        })
                    })
                })
        }
    }



    //根据商品描述 的onchang事件
    selectChange = (value) => {
        this.setState({
            searchType: value
        })
    }

    //"详情"按钮的点击事件
    showProductDetail = (product) => {
        return () => {
            this.props.history.push('/product/' + product._id, product)
        }
    }


    //"修改"按钮的点击事件
    showUpdateProduct = (product) => {
        return () => {
            this.props.history.push('/product/update', product)

        }
    }

    //添加商品的点击事件
    showAddCategoryForm = () => {
        //跳转到对应路由
        this.props.history.push('/product/add')
    }


    //获取商品
    getProducts = async (pageNum, pageSize) => {
        const { searchType,} = this.state
        let result = null
        //如果关键字存在
        if (this.isSearch ) {
            result = await reqSearchProductStatus({
                searchType,
                pageNum,
                pageSize,
                searchValue:this.currentSearchValue
            })

        } else {//否则
            result = await reqGetProducts(pageNum, pageSize)
        }

        this.setState({
            products: result.list,
            total: result.total,
            current: pageNum,
            pageSize
        })
    }



    componentDidMount() {
        this.getProducts(1, 3)
    }


  
    render() {
        const { products, total, searchType, current,pageSize } = this.state
        return (
            <Card
                title={
                    <div>
                        <Select value={searchType} onChange={this.selectChange}>
                            <Select.Option value={"productName"}>根据商品名称</Select.Option>
                            <Select.Option value={"productDesc"}>根据商品描述</Select.Option>
                        </Select>
                        <Input placeholder="关键字" className={'search-input'} onChange={this.inputChange}></Input>
                        <Button type="primary" onClick={this.search}>搜索</Button>
                    </div>
                }

                extra={
                    <Button type="primary" onClick={this.showAddCategoryForm}>
                        <Icon type="plus"></Icon>
                        添加商品
                    </Button>
                }
            >
                <Table
                    columns={this.columns}
                    dataSource={products}
                    rowKey="_id"
                    bordered
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '6,', '9',"12"],
                        pageSize,
                        total,
                        onChange: this.getProducts,
                        onShowSizeChange:this.getProducts, //pageSize 变换的回调
                        current
                    }}
                />
            </Card>
        )
    }
}
