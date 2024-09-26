import React, { useEffect, useState } from "react";
import DashBoardSideBar from "./DashboardSideBar";
import { useNavigate, useParams } from "react-router-dom"; // For handling navigation
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setSingleProduct } from "../../reduxStore/productSlice";
import FooterSection from "@components/layout/FooterSection";

const EditProduct = () => {
  const { singleProduct } = useSelector((store) => store.product);
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // DELETE
  const DeleteHandler = async () => {
    try {
      const res = await axios.delete(
        `https://prod-shop-v2.onrender.com/api/v1/products/delete-product/${productId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setSingleProduct(null));
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [input, setInput] = useState({
    name: "",
    description: "",
    file: null,
    stock: "",
    category: "",
    price: "",
  });

  // Fetch product and update state when it's available
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axios.get(
          `https://prod-shop-v2.onrender.com/api/v1/products/fetchProduct/${productId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setSingleProduct(res.data.product));
          // Set form inputs with fetched product data
          setInput({
            name: res.data.product.name || "",
            description: res.data.product.description || "",
            stock: res.data.product.stock || "",
            category: res.data.product.category || "",
            price: res.data.product.price || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleProduct();
  }, [productId, dispatch]);

  const onChangeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const onChangeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("stock", input.stock);
    formData.append("category", input.category);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.patch(
        `https://prod-shop-v2.onrender.com/api/v1/products/update-product/${productId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.success) {
        toast.success(res.data?.message);
        dispatch(setSingleProduct(res.data.product));
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!singleProduct) {
    return <div>Loading...</div>; // Display loading message while product is being fetched
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-700">
      {/* Content Section */}
      <div className="flex flex-col md:flex-row flex-grow">
        <DashBoardSideBar />
        <div className="flex-grow p-6">
          <div className="bg-gray-800 mt-24 rounded-lg shadow-md p-4 max-w-lg mx-auto">
            <h1 className="text-3xl text-center  text-white font-bold mb-6">
              Edit Product
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Product Name */}
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={onChangeInputHandler}
                    className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Product Price */}
                <div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={onChangeInputHandler}
                    value={input.price}
                    className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product price"
                    required
                  />
                </div>

                {/* Product Category */}
                <div>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    onChange={onChangeInputHandler}
                    value={input.category}
                    className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product category"
                    required
                  />
                </div>

                {/* Product Stock */}
                <div>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    onChange={onChangeInputHandler}
                    value={input.stock}
                    className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter stock quantity"
                    required
                  />
                </div>

                {/* Product Description */}
                <div className="col-span-2">
                  <textarea
                    id="description"
                    name="description"
                    onChange={onChangeInputHandler}
                    value={input.description}
                    rows="3"
                    className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product description"
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="col-span-2">
                  <label
                    htmlFor="file"
                    className="cursor-pointer w-full block text-center bg-cyan-900 text-white p-2 border border-cyan-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-800 transition duration-200"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={onChangeFileHandler}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                <button
                  type="submit"
                  className="bg-cyan-900 text-white px-4 py-2 rounded hover:bg-cyan-950 transition duration-200 w-full"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={DeleteHandler}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 w-full"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection  />
    </div>
  );
};

export default EditProduct;
