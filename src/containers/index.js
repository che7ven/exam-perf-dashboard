import Loadable from "react-loadable";

export const Dashboard = Loadable({
  loader: () => import("./Dashboard"),
  loading: () => null,
  modules: ["Dashboard"],
});

export const Login = Loadable({
  loader: () => import("./Login"),
  loading: () => null,
  modules: ["Login"],
});
