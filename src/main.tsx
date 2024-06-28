import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage/ErrorPage.tsx";
import ProductsPage from "./Components/ProductsPage/ProductsPage.tsx";
import HomePage from "./Components/LandingPage/HomePage.tsx";
import Product from "./Components/Individualproduct/Product.tsx";
import LoginPage from "./Components/LoginPage/LoginPage.tsx";
import SignUpPage from "./Components/SignUpPage/SignUpPage.tsx";
import AddPost from "./Components/AddPostComponent/AddPost.tsx";
import UserMenuPage from "./Components/userMenuPage/UserMenuPage.tsx";
import UsersPage from "./Components/UsersPage/UsersPage.tsx";
import MainPage from "./Components/mainPage/MainPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MainPage />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/products",
            element: <ProductsPage />,
          },
          {
            path: "/product/:id",
            element: <Product />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "users/:id",
        element: <UsersPage />,
        children: [
          {
            path: "",
            element: <UserMenuPage />,
          },
          {
            path: "new",
            element: <AddPost />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
