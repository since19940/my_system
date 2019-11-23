import Home from "../components/home";
import Login from "../containers/login";
import NotMach from "../components/notMach";

const authRoutes = [
  {
    path: "/",
    component: Home,
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
