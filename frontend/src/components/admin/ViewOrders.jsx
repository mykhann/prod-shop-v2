import React, { useEffect, useState } from "react";
import DashBoardSideBar from "./DashboardSideBar";
import axios from "axios";
import { setOrders } from "../../reduxStore/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.order);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://prod-shop-v2.onrender.com/api/v1/orders/get", {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          dispatch(setOrders(res.data.orders));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    fetchOrders();
  }, [dispatch]);

  if (!orders || orders.length === 0) {
    return <p>No orders</p>;
  }

  const getProductNames = (orderItems) => {
    return orderItems.reduce((acc, item, index) => {
      acc += item.product?.name;
      if (index < orderItems.length - 1) {
        acc += ", ";
      }
      return acc;
    }, "");
  };

  const toggleDetails = (orderId) => {
    setShowDetails((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="flex bg-gray-900 flex-col h-full md:flex-row">
      <DashBoardSideBar />
      <div className="flex-grow p-6">
        <h1 className="text-3xl text-white text-center font-bold mb-6">
          View Orders
        </h1>
        <div className="overflow-x-auto bg-gray-800 text-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead className="bg-cyan-950 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="hidden md:table-cell py-3 px-4 text-left">
                  Product
                </th>
                <th className="hidden md:table-cell py-3 px-4 text-left">
                  Customer
                </th>
                <th className="hidden md:table-cell py-3 px-4 text-left">
                  Email
                </th>
                <th className="hidden md:table-cell py-3 px-4 text-left">
                  Address
                </th>
                <th className="hidden md:table-cell py-3 px-4 text-left">Date</th>
                <th className="hidden md:table-cell py-3 px-4 text-left">Status</th> {/* Added Status column */}
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="hover:bg-gray-900">
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="hidden md:table-cell py-3 px-4">
                      {getProductNames(order.orderItems)}
                    </td>
                    <td className="hidden md:table-cell py-3 px-4">
                      {order.user?.name}
                    </td>
                    <td className="hidden md:table-cell py-3 px-4">
                      {order.user?.email}
                    </td>
                    <td className="hidden md:table-cell py-3 px-4">
                      {order.address}
                    </td>
                    <td className="hidden md:table-cell py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="hidden md:table-cell py-3 px-4">
                      <span
                        className={`${
                          order.orderStatus === "Cancelled"
                            ? "text-red-700 font-bold"
                            : order.orderStatus === "Delivered"
                            ? "text-green-800 font-bold"
                            : order.orderStatus === "Processing"
                            ? "text-yellow-400 font-bold"
                            : "text-gray-500 font-bold"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-blue-500 hover:text-blue-300">
                        <FaEdit
                          onClick={() =>
                            navigate(`/admin/orders/edit/${order?._id}`)
                          }
                          className="w-5 h-5 inline"
                        />
                      </button>
                    </td>
                  </tr>

                  {/* For mobile view, show more details when toggled */}
                  <tr className="md:hidden">
                    <td colSpan={5} className="py-3 px-4">
                      <button
                        onClick={() => toggleDetails(order._id)}
                        className="text-blue-500 hover:text-blue-300 font-bold border border-blue-500 rounded px-2 py-1"
                      >
                        {showDetails[order._id] ? "Show Less" : "More"}
                      </button>
                      {showDetails[order._id] && (
                        <div className="mt-2">
                          <p>Product: {getProductNames(order.orderItems)}</p>
                          <p>Customer: {order.user?.name}</p>
                          <p>Email: {order.user?.email}</p>
                          <p>Address: {order.address}</p>
                          <p>Status: 
                            <span
                              className={`${
                                order.orderStatus === "Cancelled"
                                  ? "text-red-700 font-bold"
                                  : order.orderStatus === "Delivered"
                                  ? "text-green-800 font-bold"
                                  : order.orderStatus === "Processing"
                                  ? "text-yellow-400 font-bold"
                                  : "text-gray-500 font-bold"
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </p>
                          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
