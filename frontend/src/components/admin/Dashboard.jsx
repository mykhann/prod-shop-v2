import React from "react";
import { Link } from "react-router-dom";
import DashBoardSideBar from "./DashboardSideBar";

const Dashboard = () => {
  return (
    <div className="relative flex flex-col h-screen ">
      

      <div className="flex flex-1 bg-gray-900 flex-col md:flex-row">
        {/* Sidebar */}
        <DashBoardSideBar />

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-3xl text-white text-center font-bold mb-6">
            Admin Dashboard
          </h1>

          <div className="p-6 rounded-lg">
            {/* Dashboard content */}
            <h2 className="text-xl text-white font-semibold mb-4">
              Manage Products & Orders
            </h2>

            {/* Example Cards for Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 h-full">
              {/* Add Product Card */}
              <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-2">Add Product</h3>
                <p className="text-gray-600 mb-4">
                  Add a new product to the store.
                </p>
                <Link
                  to="/admin/add-product"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Product
                </Link>
              </div>

              {/* Update Product Card */}
              <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-2">Update Product</h3>
                <p className="text-gray-600 mb-4">
                  Update existing product information.
                </p>
                <Link
                  to="/admin/update-product"
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Update Product
                </Link>
              </div>

              {/* View Orders Card */}
              <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-2">View Orders</h3>
                <p className="text-gray-600 mb-4">
                  View all orders placed in the store.
                </p>
                <Link
                  to="/admin/orders"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  View Orders
                </Link>
              </div>

              {/* Delete Orders Card */}
              <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-2">Orders Analytics</h3>
                <p className="text-gray-600 mb-4">
                 Monitor the success rate of orders & more
                </p>
                <Link
                  to="/admin/sales"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Orders Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
