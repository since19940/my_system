/* 
根据prevState和action来生成newState
*/

import { combineReducers } from 'redux'

import user from '../reducers/user'
import categories from '../reducers/categories'
import role from '../reducers/roles'

export default combineReducers({
    user,
    categories,
    roles:role
})