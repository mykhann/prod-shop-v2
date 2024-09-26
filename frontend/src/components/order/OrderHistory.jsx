import React from "react";
import Navbar from "@components/shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa"; // Importing the delete icon

const OrderHistory = () => {
  const { orderHistory } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/orders/cancel/${orderId}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
        const res=await axios.delete(`http://localhost:8000/api/v1/orders/delete-user-order/${orderId}`,{withCredentials:true})
        if (res.data.success){
            toast.success(res.data.message);
        }
    } catch (error) {
        
        toast.error(error.response.data.message);
        
    }
    
  };

  return (
    <>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <h1 className="text-center font-bold">Order History</h1>

       
        <div className="flex flex-wrap gap-4"> 
          {orderHistory.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-5 transition-transform transform hover:scale-105 relative max-w-sm w-full sm:w-1/2 lg:w-1/3" 
            >
             
              {order.orderStatus === "Cancelled" ? (
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="absolute top-3 right-3 text-red-600 hover:text-red-800"

                  aria-label="Delete Order"
                >
                  <FaTrash size={20} />
                </button>
              ) : null}

              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-500">Products:</p>
                  <ul className="list-disc pl-5">
                    {order.orderItems.map((item) => (
                      <li key={item._id}>
                        {item.product.name}{" "}
                        <span className="text-red-600">({item.quantity})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      order.orderStatus === "Delivered"
                        ? "text-green-500"
                        : order.orderStatus === "Shipped"
                        ? "text-blue-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.orderStatus}
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Total: $
                  {order.orderItems
                    .reduce(
                      (total, item) =>
                        total + item.product.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
                {order.orderStatus === "Delivered" ? (
                  <span></span>
                ) : order.orderStatus === "Shipped" ? (
                  <span></span>
                ) : (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className={`mt-2 text-white ${order.orderStatus === "Cancelled" ? "bg-red-400 cursor-not-allowed text-gray-600" : "bg-red-600 hover:bg-red-700"} font-medium py-1.5 px-3 rounded transition duration-300`}
                    disabled={order.orderStatus === "Cancelled"} 
                    
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
