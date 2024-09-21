import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

export default function LoggedInUserRoute() {
  const user = useSelector((user) => user.login.isLoggedIn);
  return user ? <Outlet /> : <Login />;
}
