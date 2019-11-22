/* 
根据prevState和action来生成newState
*/

import { combineReducers } from 'redux'

import user from '../reducers/user'
export default combineReducers({
    user
})