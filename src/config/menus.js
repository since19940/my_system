
export default [
    {
        title: 'title',
        icon: 'home',
        path:'/'
    },
    {
        title:'products',
        icon: 'skin',
        path:'/products',
        children: [
            {
                title: 'category',
                icon: 'pic-center',
                path:'/category'
            },
            {
                title: 'product',
                icon: 'database',
                path:'/product'
            }
        ]
    },

    {
        title: 'user',
        icon: 'user',
        path:'/user'
    },
    {
        title:'role',
        icon: 'key',
        path:'/role'
    },
    {
        title:'charts',
        icon: 'fund',
        path:'/charts',
        children: [
            {
                title: 'line',
                icon: 'bar-chart',
                path:'/charts/bar'
            },
            {
                title: 'bar',
                icon: 'line-chart',
                path:'/charts/line'
            },
            {
                title: 'pie',
                icon: 'pie-chart',
                path:'/charts/pie'
            }
        ]
    },

]