/* 
专门将分类中的分类列表项提取出来整成一个组件
*/



import React, { Component } from 'react'
import {Form,Input} from 'antd'

@Form.create() //将该组件调用一次可以获得form属性
 class AddCategoryForm extends Component {
     render() {
        const {getFieldDecorator} =this.props.form //在form属性中得到表单校验的方法
        return (
            <Form>
                <Form.Item label="品类名称">
                    {
                        //该校验表单的方法调用两次,第二次传需要校验的组件
                        getFieldDecorator(//第一个函数传key和校验的规则
                            "categoryName",
                            { rules:[{required:true,message: '请输入分类名称'}] }
                            )(<Input placeholder='请输入分类名称' />)
                    }
                </Form.Item>
            </Form>
        )
    }
 }

export default AddCategoryForm;
