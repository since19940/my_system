/* 
检查登录   
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const withCheckLogin = WrappedComponent => {
    return connect(
        //第一次传入的状态数据和更新状态数据的方法
        (state) => ({ token: state.user.token }),
        null
    )(
        class extends Component {
            static displayName = `CheckLogin(${WrappedComponent.displayName ||
                WrappedComponent.name ||
                "Component"})`;
            render() {
                const { token, location,...rest } = this.props
                if (location.pathname === '/login') {
                    if (token) {
                     return <Redirect to='/' />
                    }
                } else {
                    if (!token) {
                        return <Redirect to='/login' />
                       }
                }
                return <WrappedComponent {...rest} location={location}/>
            }

        }
    )

}
export default withCheckLogin