import React, { useState } from "react";
import DashBoardSideBar from "./DashboardSideBar";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import useFetchProducts from "@components/customHooks/UseFetchProducts";
import { useNavigate } from "react-router-dom";

const ViewProducts = () => {
  const { products } = useSelector((store) => store.product);
  const navigate = useNavigate();
  useFetchProducts();
  const [showMore, setShowMore] = useState({}); // State to control visibility of details for each product

  const toggleShowMore = (productId) => {
    setShowMore((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row">
      <DashBoardSideBar />
      <div className="flex-grow p-6 bg-gray-900">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">View Products</h1>
        </div>
        <div className="overflow-x-auto bg-gray-800 p-4">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Actions</th>
                <th className="py-3 px-4 text-left">More</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <React.Fragment key={product._id}>
                  <tr className="border-b text-white border-gray-600 bg-gray-800 cursor-pointer hover:bg-gray-900">
                    <td className="py-3 px-4">{product?.name}</td>
                    <td className="py-3 px-4">
                      <img src={product.avatars[0]} className="w-16 h-16 object-cover rounded" alt={product?.name} />
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <FaEdit onClick={() => navigate(`/admin/product/edit/${product?._id}`)} className="text-blue-500 cursor-pointer text-xl hover:text-blue-700" title="Edit" />
                      
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleShowMore(product._id)}
                        className="bg-cyan-900 text-white px-4 py-2 rounded hover:bg-cyan-950 transition duration-300"
                      >
                        {showMore[product._id] ? "Show Less" : "More"}
                      </button>
                    </td>
                  </tr>
                  {showMore[product._id] && (
                    <tr className="text-white bg-gray-800">
                      <td colSpan="4" className="py-3 px-4">
                        <div>
                          <strong>Price:</strong> ${product?.price}<br />
                          <strong>Stock:</strong> {product?.stock}<br />
                          <strong>Description:</strong> {product?.description}<br />
                          <strong>Category:</strong> {product?.category}<br />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
