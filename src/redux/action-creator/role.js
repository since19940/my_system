import {reqGetRole,reqAddRole,reqUpdateRole} from '../../api'
import {GET_ROLES_SUCCESS,ADD_ROLES_SUCCESS,UPDATE_ROLE_SUCCESS} from '../action-types/role'


const getRolesSuccess = (roles) => ({
    type: GET_ROLES_SUCCESS,
        data:roles
})

//获取角色列表

export const getRolesAsync = () => {
    return (dispatch) => {
        return reqGetRole()
            .then((res) => {
                console.log(res)///
            dispatch(getRolesSuccess(res))
        })
    }
}


//添加角色 同步action
const addRolesSuccess = (name) => ({
    type: ADD_ROLES_SUCCESS,
    data:name
})

//添加角色 异步的action
export const addRoleAsync = (name) => {
    return (dispatch) => {
        return reqAddRole(name)
            .then((res) => {
            dispatch(addRolesSuccess(res))
        })
    }
}



//更新角色权限同步
const updateRoleSuccess = (role) =>({
    type: UPDATE_ROLE_SUCCESS,
    data: role
})


//更新角色权限异步
export const updateRoleAsync = ({ roleId, authName, menus }) => {
    return (dispatch) => {
        return reqUpdateRole({roleId, authName, menus })
            .then((res) => {
            dispatch(updateRoleSuccess(res))
        })
    }
}
