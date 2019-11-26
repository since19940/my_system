import React, { Component } from 'react'
import { Card, Icon, Button, Table, Modal } from 'antd';
import { connect } from 'react-redux'
import { getCategoriesAsync, reqCategoriesAddAsync,updateCategoryAsync } from '../../redux/action-creator/categories'

import AddCategoryForm from './add-category-form'
import UpdateCategoryForm from'./update-category-form'


@connect(
    (state) => ({ categories: state.categories }),
    { getCategoriesAsync, reqCategoriesAddAsync ,updateCategoryAsync}//用connect将该
)

class Category extends Component {

    state = {
        AddCategoryVisible: false,
        updateCategoryVisible: false,
        category:{}, //选中的某个分类数据
    }

    //修改分类弹窗的ok事件
    updateCategory = () => {
        this.updateCategoryForm.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { categoryName } = values
                const categoryId = this.state.category._id;
                await this.props.updateCategoryAsync(categoryId,categoryName)
                this.hidden('updateCategory')()
            }  
        })

    }

    //修改分类点击事件
    showUpdateCategory = (category) => {

        //onClick必须接受一个函数为参数,调用后,接收调用的返回值
        return () => {//这里是点击事件,拿到外部的变量
            this.setState({
                updateCategoryVisible: true,
                category //将拿到的值,更新到状态中
            })
    
       }

    }


    hidden = name => {//点击取消
        return () => {
          // 清空表单数据
          this.setState({
            [name + "Visible"]: false //对话框隐藏
          });
          setTimeout(() => {
            this[name + "Form"].props.form.resetFields(); //清空表单内数据
          }, 500);
        };
      };



    show = () => {
        this.setState({
            AddCategoryVisible: true,
        })
    }

    //确认添加分类的数据
    addCategory = () => {
        this.AddCategoryForm.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { categoryName } = values;//这里的name就是校验时候填写的key
                //发送请求(更新后台数据),更新redux数据
                await this.props.reqCategoriesAddAsync(categoryName)//该方法返回值看action-creators里面函数(dispatch)的返回值
                this.setState({
                    AddCategoryVisible: false
                })
            }
        })
    }



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
            render: (category) => {//render方法可以拿到渲染出来的数据,将该数据和点击事件绑定在一起
                return <div>
                    <Button type="link" onClick={this.showUpdateCategory(category)}>修改分类</Button>
                    <Button type="link">删除分类</Button>
                </div>
            } 
        },

    ]


    render() {
        const { categories } = this.props
        const { AddCategoryVisible, updateCategoryVisible, category } = this.state

        return (
            
            <div>
                <Card title="分类列表"
                    extra={
                        <Button type="primary" onClick={this.show} >
                            <Icon type="plus" />
                            分类列表
                    </Button>}>
                    <Table columns={this.columns}
                        dataSource={categories} //这里将请求回来的数据进行展示
                        bordered rowKey="_id"
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            pageSizeOptions: [
                                '3', '6,', '9'
                            ],
                            defaultPageSize: 3
                        }}
                    />
                </Card>

                <Modal
                    title="添加分类"
                    visible={AddCategoryVisible}
                    onOk={this.addCategory}
                    onCancel={this.hidden("AddCategory")}
                    width={300}
                >

                    {/*当前组件在外面,form表单在里面,表单校验校验需要拿到form属性
                    子组件若添加了这个属性,就会默认调用该函数,并把自己实例对象form属性挂载到this上面,
                    而因为是箭头函数的原因,这个this(这里是Category)是该父组件的实例对象
                    */}
                    <AddCategoryForm wrappedComponentRef={(form) => { this.AddCategoryForm = form }} />

                </Modal>


                <Modal
                    title="修改分类"
                    visible={updateCategoryVisible}
                    onOk={this.updateCategory}
                    onCancel={this.hidden("updateCategory")}
                    width={300}
                >

                    {/*当前组件在外面,form表单在里面,表单校验校验需要拿到form属性
                    子组件若添加了这个属性,就会默认调用该函数,并把自己实例对象form属性挂载到this上面,
                    而因为是箭头函数的原因,这个this(这里是Category)是该父组件的实例对象
                    */}
                    <UpdateCategoryForm
                        categoryName={category.name}
                        wrappedComponentRef={(form) => { this.updateCategoryForm = form }} />
                    {/* 因为里面的表单需要外面父组件的名字才能够将名字显示在表单里
                        但是父组件无法知道被点击的是哪个表单
                    
                    */}
                </Modal>
            </div>
        )
    }
}


export default Category