import { reqCategories ,reqCategoriesAdd,reqUpdateCategories} from '../../api'
import {GET_CATEGORIES_SUCCESS,GET_CATEGORY_SUCCESSADD,UPDATE_CATEGORY_SUCCESS} from '../action-types/category'

const getCategoriesSuccess = (categories) => ({
    type: GET_CATEGORIES_SUCCESS,
    data:categories
})

export const getCategoriesAsync = () => {
    return (dispatch) => {
        reqCategories()
            .then((response) => {
                dispatch(getCategoriesSuccess(response))
            })
    }
}


const categorySuccessAdd = (category) => ({
    type: GET_CATEGORY_SUCCESSADD,
    data:category
})


//修改分类的同步action
const updateCategorySuccess = (category) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    data:category
})



//添加分类的异步action
export const reqCategoriesAddAsync = (categoryName) => {
    return ((dispatch) => {//最后会将该函数执行完毕后return的是一个promise
        return reqCategoriesAdd(categoryName)
            .then((response) => {//一旦数据请求成功,将成功的数据作为同步action函数的参数传入
            dispatch(categorySuccessAdd(response))//最后dispatch触发更新reducer
        })
    })
}



//修改分类的异步action
export const updateCategoryAsync = (categoryId,categoryName) => {
    return ((dispatch) => {//最后会将该函数执行完毕后return的是一个promise
        return reqUpdateCategories(categoryId,categoryName)
            .then((response) => {//一旦数据请求成功,将成功的数据作为同步action函数的参数传入
            dispatch(updateCategorySuccess(response))//最后dispatch触发更新reducer
        })
    })
}