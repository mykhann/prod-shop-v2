import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/layout/Home";
import Products from "./components/products/Products";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProductDetails from "@components/products/ProductDetails";
import { Provider } from "react-redux";
import { store } from "./reduxStore/store"; // Import your Redux store
import { ToastContainer } from "react-toastify";
import ProfileDetails from "@components/auth/ProfileDetails";
import EditProfile from "@components/auth/EditProfile";
import Dashboard from "@components/admin/Dashboard";
import AddProduct from "@components/admin/AddProduct";
import UpdateProduct from "@components/admin/UpdateProduct";
import ViewOrders from "@components/admin/ViewOrders";
import DeleteOrders from "@components/admin/DeleteOrders";
import EditProduct from "@components/admin/EditProduct";
import EditOrders from "@components/admin/EditOrders";
import Cart from "@components/order/Cart";
import Checkout from "@components/order/Checkout";

// redux persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ProtectedRoutes from "@components/admin/ProtectedRoutes";
import TotalSales from "@components/admin/TotalSales";


let persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/profile",
    element: <ProfileDetails />,
  },
  {
    path: "/profile/edit",
    element: <EditProfile />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },

  // admin routes
  {
    path: "/dashboard",

    element: (
      <ProtectedRoutes>
        <Dashboard />,
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/add-product",
    element: (
      <ProtectedRoutes>
        <AddProduct />,
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/update-product",
    element: (
      <ProtectedRoutes>
        <UpdateProduct />,
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoutes>
        <ViewOrders />,
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/orders/delete",
    element: (
      <ProtectedRoutes>
        <DeleteOrders />,
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/product/edit/:id",
    element: (
      <ProtectedRoutes>
        <EditProduct />,
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/orders/edit/:id",
    element: (
      <ProtectedRoutes>
        <EditOrders />,
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/sales",
    element: (
      <ProtectedRoutes>
        <TotalSales />,
      </ProtectedRoutes>
    ),
  },

]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
}

export default App;
