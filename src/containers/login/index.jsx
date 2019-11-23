import React, { Component } from 'react';
import { Form, Input, Button, Icon, } from 'antd';
import { getUserAsync } from '../../redux/action-creator/user'
import withCheckLogin from '../with-check-login'
import {setItem} from '../../utils/storage'
import { connect } from 'react-redux'
import logo from '../../assets/logo.png'
import './index.less'

const { Item } = Form;
@withCheckLogin
@connect(null, { getUserAsync })
@Form.create()//正常应该调用两次,但是用装饰符值调用一次,最后一次它自动调
class Login extends Component {

    validator = (rule, value, callback) => {

        //判断是哪个组件使用,rule身上的filed可以得到具体的使用类型
        const name = rule.field === 'username' ? '用户名' : '密码'
        //rule用来获取当前校验的是哪个表单,具体哪个input;value当前表单的值
        //callback不管校验成功还是失败,必须调用的函数
        //callback()直接调用代表验证成功
        //callback('xxx')传参代表校验失败
        if (!value) {//如果value没有值,说明没有输入
            callback(`请输入${name}`)//直接提示输入密码
        } else if (value.length < 4) {
            callback(`${name}长度最少4位`)
        } else if (value.length > 10) {
            callback(`${name}长度位不能大于10位`)
        } else if (!/\w/.test(value)) {
            callback(`${name}只能包含字母数字下划线`)
        } else {
            callback()//以上都成功
        }
    }

    login = (e) => {
        e.preventDefault();//一上来要禁止默认行为
        //收集表单数据之前先校验
        const {form}=this.props
        form.validateFields((err,values) => {
           //err校验后的错误信息    values 表单项的值
            if (!err) {//如果没有错误提示
                const { username,password} = values;
                //校验就成功,发送请求
                this.props.getUserAsync(username,password)
                    .then((response) => {
                        console.log(response)
                        //持久化存储用户数据
                        setItem('user',response)
                        this.props.history.push('/')
                        form.resetFields(['password'])//不传重置所有

                    }).catch((err) => {
                       form.resetFields(['password'])
                })

            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className='login-selection'>
                    <Form onClick={this.login}>
                        <h3>用户登录</h3>
                        <Item>
                            {  //通过Form.create方法调用让login获得form属性,再从form属性中提取getFieldDecorator
                                getFieldDecorator(//第一次传表单校验
                                    'username',
                                    {
                                        rules: [//表单校验的规则,rules这个数组里用一个个对象来放置每条规则
                                            /*   {//该方式适用于只有一条校验规则的场景
                                                  required: true, message: '请输入您的用户名'
                                              },
                                              {
                                                  min: 4, message: '用户名长度最少4位'
                                              },
                                              {
                                                  max: 8, message: '用户名不能超过8位'
                                              },
                                              {
                                                  pattern: /\w/,
                                                  message:'用户名只能是英文字符下换线'
                                              } */
                                            {//适用多条校验规则,便于复用
                                                //使用validator能更好的复用
                                                validator: this.validator
                                            }


                                        ]
                                    }

                                )(//第二次传组件
                                    <Input prefix={<Icon type='team' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入你的用户名"
                                    />
                                )
                            }
                        </Item>

                        <Item>
                            {
                                getFieldDecorator(
                                    'password',
                                    {
                                        rules: [
                                            {
                                                validator: this.validator
                                            },

                                        ],
                                    }
                                )(
                                    <Input prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='请输入你的密码' type='password'
                                    />
                                )
                            }
                        </Item>

                        <Item>
                            <Button type='primary' className='login-btn' htmlType='submit'>登录</Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

//在Form表单中调用creat方法//第二次传组件,返回的是一个新组件,新组件包着login组件,
//新组件就给login传form属性





export default Login//Form.create是一个高阶组件的用法,作用是给组件传递form属性