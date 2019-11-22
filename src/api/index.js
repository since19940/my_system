/* 
用来定义请求方法的模块
*/

import axiosInstance from './request';

export const reqLogin = (username,password) => axiosInstance({
        method: 'POST',
        url: '/login',
        data: {
            username,
            password
        }
    })


export const reqCategories = () => axiosInstance({
        method: 'GET',
        url: '/category/get'
    })

export const reqCategoriesAdd = (categoryName) => axiosInstance({
        method: 'POST',
        url: '/category/add',
        data: {
            categoryName
        } 
    })