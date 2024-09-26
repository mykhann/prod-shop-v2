import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  PlusCircleIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { IoAnalytics } from "react-icons/io5";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxStore/authSlice";
import { toast } from "react-toastify";

const DashBoardSideBar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("https://prod-shop-v2.onrender.com/api/v1/users/logout", {}, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className={`hidden md:flex flex-none w-64 transition-width duration-300 bg-gray-800 p-6 h-screen`}>
        <div className="flex flex-col h-full">
          {/* Logout Button at the top for large screens */}
          <button onClick={handleLogout} className="mb-4 text-white bg-red-700 flex items-center justify-start p-2 rounded hover:bg-red-600 transition duration-200">
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            Logout
          </button>

          <div className="flex justify-between items-center mb-8">
            
            
          </div>
          <nav className="overflow-y-auto flex-grow">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin/add-product"
                  className="text-lg text-gray-300 border-rose-600 hover:text-white hover:bg-cyan-950 transition duration-200 flex items-center"
                >
                  Add Product <PlusCircleIcon className="text-white ml-4 w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/update-product"
                  className="text-lg text-gray-300 hover:text-white transition hover:bg-cyan-950 duration-200 flex items-center"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="text-lg text-gray-300 hover:text-white hover:bg-cyan-950 transition duration-200 flex items-center"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/sales"
                  className="text-lg text-gray-300 hover:text-white hover:bg-cyan-950 transition duration-200 flex items-center"
                >
                  Orders analytics <IoAnalytics className="w-6 h-6 ml-4" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Toggle button for mobile screens */}
      <Link to="/dashboard">
        {/* <h2 className="text-2xl text-center font-bold text-white">Admin Dashboard</h2> */}
      </Link>
      <div className="md:hidden flex items-center p-4 bg-gray-800">
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Links displayed when sidebar is toggled on mobile */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
        <nav className="flex flex-col space-y-2 bg-gray-800 p-4">
          <Link to="/admin/add-product" className="text-lg text-gray-300 hover:text-white">
            Add Product
          </Link>
          <Link to="/admin/update-product" className="text-lg text-gray-300 hover:text-white">
            Products
          </Link>
          <Link to="/admin/orders" className="text-lg text-gray-300 hover:text-white">
            Orders
          </Link>
          <Link to="/admin/sales" className="text-lg text-gray-300 hover:text-white">
            Orders analytics
          </Link>
          {/* Logout Button for Mobile View */}
          <button onClick={handleLogout} className="mt-2 text-white bg-red-700 w-full flex items-center justify-center p-2 rounded hover:bg-red-600 transition duration-200">
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
