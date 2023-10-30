import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Users from "../pages/users/Users";
import Products from "../pages/products/Products";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import Login from "../pages/login/Login";
import Register from "../pages/register/register";
import AI from "../pages/aichat/AiChat";
import "../styles/global.scss";
import { useEffect } from "react";
import { setAxiosConfig } from "../utils/axiosWithConfig";
import { useToken } from "../utils/states/context/token-context";

function App() {
  const { token } = useToken();

  useEffect(() => {
    setAxiosConfig("", "https://651a7cf5340309952f0d6110.mockapi.io/api/v1");
  });

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: token === "" ? <Navigate to="/login" /> : <Layout />,
      children: [
        {
          path: "/",
          element: token === "" ? <Navigate to="/login" /> : <Home />,
        },
        {
          path: "/users",
          element: token === "" ? <Navigate to="/login" /> : <Users />,
        },
        {
          path: "/products",
          element: token === "" ? <Navigate to="/login" /> : <Products />,
        },
        {
          path: "/ai",
          element: token === "" ? <Navigate to="/login" /> : <AI />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
