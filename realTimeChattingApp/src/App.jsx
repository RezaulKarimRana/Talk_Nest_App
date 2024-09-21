import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import RootLayout from "./components/rootLayout";
import "react-toastify/dist/ReactToastify.css";
import NotLoggedInUserRoute from "./privateRoute/NotLoggedInUserRoute";
import LoggedInUserRoute from "./privateRoute/LoggedInUserRoute";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedInUserRoute />}>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Messages />} />
          </Route>
        </Route>
        <Route element={<NotLoggedInUserRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
