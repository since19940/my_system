/* 
用来创建action对象
    同步action creator:返回值就是action对象
    异步action creator:返回值是一个函数,在函数中完成异步操作
 */

import {reqLogin } from '../../api';
import {GET_USER_SUCCESS,REMOVE_USER_SUCCESS} from '../action-types/user'

//同步
const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    data:user
})


export const removeUserSuccess = () => ({
    type:REMOVE_USER_SUCCESS
})

//异步
export const getUserAsync = (username,Password) => {
    return (dispatch) => {
         //进行异步操作
     return reqLogin(username, Password)
            .then((response) => {
                //创建action对象,
                const action = getUserSuccess(response)
                //然后调用dispatch方法
                dispatch(action);
                return response
            })/* 
            去掉catch 是为了保证promise的catch 错误一直找下去
            */
     }
}
 
