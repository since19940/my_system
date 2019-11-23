import React, { Component } from 'react'
import withCheckLogin  from '../../containers/with-check-login'
@withCheckLogin class NotMath extends Component {
    render() {
        return (
            <div>
                <h1>数据丢失.....404</h1>
            </div>
        )
    }
}

export default NotMath