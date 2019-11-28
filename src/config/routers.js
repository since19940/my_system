import Home from "../components/home";
import Login from "../containers/login";
import NotMach from "../components/notMach";
import Category from "../containers/category";
import Product from "../components/product";
import ProductForm from '../components/product/product-form'
import ProductDetail from '../components/product/product-detail'
import Role from '../containers/role/'
import User from '../containers/user'


const authRoutes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/category",
    component: Category,
    exact: true
  },
  {
    path: "/Product",
    component: Product,
    exact: true
  },
  {
    path: "/Product/add",
    component: ProductForm,
    exact: true
  },
  {
    path: "/Product/update/:id",
    component: ProductForm,
    exact: true
  },
  {
    path: "/Product/:id",
    component: ProductDetail,
    exact: true
  },
  {
    path: "/Role",
    component: Role,
    exact: true
  },
  {
    path: "/User",
    component: User,
    exact: true
  },

  {
    component: NotMach
  }
];

const noAuthRoutes = [
  {
    path: "/login",
    component: Login,
    exact: true
  }
];

export { authRoutes, noAuthRoutes };
