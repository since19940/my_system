import Home from '../components/home'
import Login from '../components/login'
import NotMach from '../components/notMach'


export default [
    {
        path: '/',
        component: Home,
        exact:true
    },
    {
        path: '/login',
        component: Login,
        exact:true
    },
    {
        component:NotMach
    }
]