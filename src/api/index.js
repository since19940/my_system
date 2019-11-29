/* 
用来定义请求方法的模块
*/

import axiosInstance from './request';

//请求登录
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

    //请求添加分类
export const reqCategoriesAdd = (categoryName) => axiosInstance({
        method: 'POST',
        url: '/category/add',
        data: {
            categoryName
        } 
})
    

//请求修改分类
export const reqUpdateCategories = (categoryId,categoryName) => axiosInstance({
    method: 'POST',
    url: '/category/update',
    data: {
        categoryId,
        categoryName
    } 
})


//请求获取商品列表数据
export const reqGetProducts = (pageNum,pageSize) => axiosInstance({
    method: 'GET',
    url: '/product/list',
    params: {
        pageNum,
        pageSize
    } 
})


//请求添加商品,因为参数过多,避免顺序出错,用对象的方式传参
export const reqAddProduct = ({ categoryId, name, price, desc, detail }) => axiosInstance({
    method: "POST",
    url: 'product/add',
    data: {
        categoryId, name, price, desc, detail 
    }
})

//请求获取单个产品数据
export const reqGetProduct = (productId) => axiosInstance({
    method: "GET",
    url: 'product/get',
    params: {
       productId
    }
})
export const reqUpdateProduct = ({productId,categoryId,name,price,desc,detail}) => axiosInstance({
    method: "POST",
    url: 'product/update',
    data: {
        productId,categoryId,name,price,desc,detail
    }
})

//更新单个商品状态
export const reqUpdateProductStatus = (productId,status) => axiosInstance({
    method: "POST",
    url: 'product/update/status',
    data: {
        productId,status
    }
})
export const reqSearchProductStatus = ({searchType,searchValue,pageNum,pageSize}) => axiosInstance({
    method: "GET",
    url: 'product/search',
    params: {
        pageNum,
        pageSize,
        [searchType]:searchValue //搜索依据:搜索对应的值
    }
})

export const reqGetRole = () => axiosInstance({
    method: "GET",
    url:"/role/get"
})

export const reqAddRole = (name) => axiosInstance({
    method: "POST",
    url: "/role/add",
    data: {
        name
    }
})

export const reqUpdateRole = ({roleId,authName,menus}) => axiosInstance({
    method: "POST",
    url: "/role/update",
    data: {
        roleId,authName,menus
    }
})