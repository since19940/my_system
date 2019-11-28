import React, { Component } from 'react'
import { Card,Descriptions, Icon} from 'antd'
import { connect } from 'react-redux'
import{reqGetProduct}from '../../../api'
import {getCategoriesAsync} from '../../../redux/action-creator/categories'



@connect((state)=>({categories:state.categories}),{getCategoriesAsync})
class ProductDetail extends Component {

    state = {
        product:{}
    }

    goBack = () => {
        this.props.history.push('/product')
    }

    componentDidMount(){
        if (!this.props.categories.length) {//如果分类数据不存在
            this.props.getCategoriesAsync();//先请求数据
        }
        if (!this.props.location.state) {
            reqGetProduct(this.props.match.params.id)
                .then((res) => {
                    this.setState({
                    product:res
                })
            })
        }
    }

    render() {
        const {location:{state},categories} = this.props
        const { name, desc, price, categoryId, status, detail } = state || this.state.product
        const category =categories.find((category) => category._id === categoryId)
        const categoryName =category && category.name
        return (
            <Card
                title={
                    <div>
                        <Icon type="arrow-left" onClick={this.goBack} />&nbsp; 
                        商品详情
                    </div>
            }
            >
                <Descriptions bordered="true">
                    <Descriptions.Item label="商品名称" >{name}</Descriptions.Item>
                    <Descriptions.Item label="商品描述" >{desc}</Descriptions.Item>
                    <Descriptions.Item label="商品价格">{price}</Descriptions.Item>
                    <Descriptions.Item label="商品分类">{categoryName}</Descriptions.Item>
                    <Descriptions.Item label="商品状态" span={2}>
                        {status ===1 ? "下架":"上架"}
                    </Descriptions.Item>
                    <Descriptions.Item label="商品详情">
                        <div dangerouslySetInnerHTML={{__html: detail }}></div>
                    </Descriptions.Item>
                </Descriptions>
               
            </Card>
        )
    }
}


export default  ProductDetail