import Home from '../components/home'
import Login from '../containers/login'
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