import { reqCategories } from '../../api'
import {GET_CATEGORIES_SUCCESS} from '../action-types/category'

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