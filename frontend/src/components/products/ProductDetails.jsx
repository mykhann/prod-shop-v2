import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setSingleProduct } from "../../reduxStore/productSlice";
import Navbar from "@components/shared/Navbar";
import FooterSection from "@components/layout/FooterSection";
import { ArrowLeftCircleIcon, ArrowUpLeftIcon, ArrowUturnLeftIcon, BackspaceIcon, BackwardIcon, PhoneArrowDownLeftIcon } from "@heroicons/react/24/outline";

const ProductDetails = () => {
  const { singleProduct } = useSelector((store) => store.product);
  const params = useParams();
  const navigate=useNavigate();
  const productId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/products/fetchProduct/${productId}`
        );
        if (res.data.success) {
          dispatch(setSingleProduct(res.data.product));
          toast.success("Product fetched successfully");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching product");
      }
    };
    fetchProduct();
  }, [productId, dispatch]);

  

  return (
    <>
    <div className="flex">

    <Navbar/>
    </div>
    {/* Back Arrow */}
    <div className="absolute top-10 z-50 mt-32 left-64">
        <button onClick={()=>navigate(-1)} className="flex items-center space-x-2">
          <ArrowUturnLeftIcon className="h-6 font-bold w-full ml-32 text-gray-800" />
          
        </button>
      </div>
    
    <div className="flex flex-col md:flex-row items-center justify-center mt-40 cursor-pointer p-6 rounded-lg shadow-md">
      
      <div className="overflow-hidden rounded-md w-80 h-80 mr-6">
        <img
          src={singleProduct?.avatars}
          alt={singleProduct?.name}
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {singleProduct?.name}
        </h1>
        <p>{singleProduct?.description}</p>
        <p className="text-lg text-gray-600 mb-2">
          Stock: {singleProduct?.stock}
        </p>
        <h2 className="text-xl font-semibold text-red-500">
          Price: ${singleProduct?.price}
        </h2>
       
      </div>
      
      
    </div>
    
    <div className="mt-20"><FooterSection/></div></>
  );
};

export default ProductDetails;
