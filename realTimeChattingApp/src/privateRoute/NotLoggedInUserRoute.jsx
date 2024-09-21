import { useSelector } from "react-redux";
import Home from "../pages/Home";
import { Outlet } from "react-router-dom";

export default function NotLoggedInUserRoute() {
  const user = useSelector((user) => user.login.isLoggedIn);
  return user ? <Home /> : <Outlet />;
}
