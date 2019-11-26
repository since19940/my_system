/* 
专门将分类中的分类列表项提取出来整成一个组件
*/



import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types';

@Form.create() //将该组件调用一次可以获得form属性
class UpdateCategoryForm extends Component {
    static propTypes= {
        categoryName:PropTypes.string.isRequired
    }

    validator = (rule, value, callback) => {
        if (!value) {
            callback('请输入分类名称')
        } else if (value === this.props.categoryName) {
            callback("请修改分类最新的分类名称")
        } else {
            callback()
        }
    }
        
     render() {
         const { getFieldDecorator } = this.props.form //在form属性中得到表单校验的方法
         const {categoryName}=this.props
        return (
            <Form>
                <Form.Item label="品类名称">
                    {
                        //该校验表单的方法调用两次,第二次传需要校验的组件
                        getFieldDecorator(//第一个函数传key和校验的规则
                            "categoryName",
                            {
                                rules: [{ required: true, message: '请输入修改的分类名称' },
                                        {validator:this.validator}
                                ],
                                initialValue:categoryName
                            }
                            )(<Input placeholder='请输入分类名称' />)
                    }
                </Form.Item>
            </Form>
        )
    }
 }

export default UpdateCategoryForm;
