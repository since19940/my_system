import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_SUCCESSADD,
    UPDATE_CATEGORY_SUCCESS
} from '../action-types/category'

const initState = [];

function categories(prevState = initState, action) {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return action.data;
        case GET_CATEGORY_SUCCESSADD:
            return [...prevState, action.data];
        case UPDATE_CATEGORY_SUCCESS:
            return prevState.map((category) => {
                if (prevState._id === action.data._id) {
                    return action.data
                }
                return category
            })
        default:
            return prevState
    }
}


export default categories;