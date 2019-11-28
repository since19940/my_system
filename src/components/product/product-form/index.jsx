import React, { Component } from 'react'
import { connect } from "react-redux"
import { Card, Form, Input, Icon, InputNumber, Button, Select,message } from "antd"
import { getCategoriesAsync } from '../../../redux/action-creator/categories.js'
import { reqAddProduct, reqGetProduct,reqUpdateProduct} from '../../../api'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'





@Form.create()
@connect(state => ({ categories: state.categories }), { getCategoriesAsync,})
class ProductForm extends Component {

    state = {
        //初始化为null,保证没有数据的时候,不会进入BraftEditor.createEditorState(product.detail)初始化一个空P标签
        product:null
    }



    addProduct = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const { name, desc, price, categoryId, editorState } = values
                const detail = editorState.toHTML();

                let content = "添加";
                const { pathname, state } = this.props.location;
                //判断是添加还是更新商品
                if (pathname.startsWith('/product/update')) {//修改
                    const productId = state ? state._id : this.state.product._id;
                    reqUpdateProduct({ name, desc, price, categoryId, detail,productId })
                    content = "更新";
                } else {
                    //添加
                    reqAddProduct({ name, desc, price, categoryId, detail })
                }

                message.success(content+'商品添加成功')
                //跳转到商品页面
                this.props.history.push('/product'); 


            }
        })
    }

    componentDidMount() {
        if (!this.props.categories.length) {
            this.props.getCategoriesAsync()
        }

        if (!this.props.location.state) {
            //请求地址栏
            reqGetProduct(this.props.match.params.id).then(res => {
                this.setState({
                    product:res
                })
            })
        }
    }

    validator = (rule, value, callback) => {
        // 如果数据为空也要报错
        // 如果有数据，数据是editorState。需要调用它的isEmpty方法来判断是否为空
        if (!value || value.isEmpty()) {
            callback("请输入商品详情");
        } else {
            callback();
        }
    };


    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        const { categories, form: { getFieldDecorator }, location: { pathname,state } } = this.props
        let product = null;
        if (pathname.startsWith('/product/update')) {//如果路径是以/product/update开头的,说明是修改
            product = state || this.state.product 
        }
        return (
            <Card
                title={
                    <div>
                        <Icon type="arrow-left" onClick={this.goBack} />&nbsp;
                        添加商品
                    </div>
                }

            >
                <Form
                    labelCol={{ span: 2 }}//改变左边的宽度
                    wrapperCol={{ span: 8 }}//改变右边的宽度
                    onSubmit={this.addProduct}
                >
                    <Form.Item label="商品名称">
                        {getFieldDecorator("name", {
                            rules: [{ required: true, message: "请输入商品名称" }],
                            initialValue: product ? product.name : ""
                        })(<Input placeholder="请输入商品名称" />)}
                    </Form.Item>

                    <Form.Item label="商品描述">
                        {getFieldDecorator("desc", {
                            rules: [{ required: true, message: "请输入商品描述" }],
                            initialValue: product ? product.desc : ""
                        })(<Input placeholder="请输入商品描述" />)}
                    </Form.Item>

                    <Form.Item label="商品分类">
                        {getFieldDecorator("categoryId", {
                            rules: [{ required: true, message: "请选择商品分类" }],
                            initialValue: product ? product.categoryId : ""
                        })(
                            <Select placeholder="请选择商品分类">
                                {categories.map(category => (
                                    <Select.Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="商品价格">
                        {getFieldDecorator("price", {
                            rules: [{ required: true, message: "商品价格不能为空" }],
                            initialValue: product ? product.price : ""
                        })(<InputNumber
                            style={{ width: 100 }}
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/￥\s?|(,*)/g, '')}
                        />)}
                    </Form.Item>

                    <Form.Item label="商品详情" wrapperCol={{ span: 20 }}>
                        {getFieldDecorator("editorState", {
                            validateTrigger: "onBlur", // 校验子节点的时机（失去焦点再进行表单校验）
                            rules: [
                                {
                                    required: true,
                                    validator: this.validator
                                }
                            ],
                            initialValue: product ? BraftEditor.createEditorState(product.detail): ""
                        })(
                            <BraftEditor
                                className="rich-text-editor"
                                placeholder="请输入商品详情"
                            />
                        )}
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}


export default ProductForm