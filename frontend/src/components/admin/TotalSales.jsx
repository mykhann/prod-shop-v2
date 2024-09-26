import React from "react";
import DashBoardSideBar from "./DashboardSideBar";
import { useSelector } from "react-redux";
import { IoAnalytics } from "react-icons/io5";

const TotalSales = () => {
  const { orders = [] } = useSelector((store) => store.order);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;
  const salesSuccess =
    totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;
  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "Shipped"
  ).length;
  const processingOrders = orders.filter(
    (order) => order.orderStatus === "Processing"
  ).length;
  console.log("shipped: " + shippedOrders);
  console.log("processing orders: " + processingOrders);

  const salesSuccessCSS =
    salesSuccess < 50
      ? "bg-red-600"
      : salesSuccess <= 60
      ? "bg-yellow-600"
      : "bg-green-600";

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <DashBoardSideBar />
        <div className="flex-grow bg-gray-900 p-6">
          <h1 className="text-3xl text-white text-center font-bold mb-6">
            Orders Analytics
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Orders Card */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-xl font-bold mb-2 text-center">
                Total Orders
              </h2>
              <p className="text-3xl font-bold text-center">{totalOrders}</p>
            </div>

            {/* Delivered Orders Card */}
            <div className="bg-green-600 p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-xl font-bold mb-2 text-center">
                Delivered Orders
              </h2>
              <p className="text-3xl font-bold text-center">
                {deliveredOrders}
              </p>
            </div>

            {/* Sales Success Rate Card */}
            <div
              className={`${salesSuccessCSS} bg-gray-800 p-6 rounded-lg shadow-lg text-white`}
            >
              <h2 className="text-xl font-bold mb-2 text-center">
                Orders Success Rate
              </h2>
              <p className="text-3xl font-bold text-center">
                {salesSuccess.toFixed(1)}%
              </p>
            </div>
            <div className=" p-6 rounded-lg bg-blue-600 shadow-lg text-white">
              <h2 className="text-xl font-bold mb-2 text-center">
                Total Shipped Orders
              </h2>
              <p className="text-3xl font-bold text-center">{shippedOrders}</p>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-xl font-bold mb-2 text-center ">
                Total Processing Orders
              </h2>
              <p className="text-3xl  font-bold text-center">
                {processingOrders}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalSales;
