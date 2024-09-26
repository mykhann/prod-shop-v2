import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCartItems } from '../../reduxStore/cartSlice';
import { toast } from 'react-toastify';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductCard = ({products}) => {
 
  const navigate=useNavigate()
const dispatch=useDispatch()
  
  const addToCartHandler=()=>{
    dispatch(setCartItems(products))
    toast.success("product added to cart")
  }
  return (

<div
 
  className="relative  shadow-md rounded-lg overflow-hidden transition-transform transform  duration-300 ease-in-out"
>
  {/* Add to Cart Button at the Top Right */}
  <button
    onClick={addToCartHandler}
    className="absolute top-2 right-2 p-2 bg-red-700 hover:scale-125 ease-in-out text-white rounded-full hover:bg-gray-600 transition-colors duration-300  z-10"
  >
   <ShoppingCartIcon className="h-6 text-white w-6" />
   
  </button>

  {/* Product Image */}
  <img
    src={products.avatars[0]}
    alt={products.name}
    className="w-full h-40 object-cover transition-transform duration-200 ease-in-out"
  />

  {/* Product Details */}
  <div onClick={() => navigate(`/products/${products._id}`)} className="p-4">
    <h3 className="text-lg font-semibold text-red-600">{products.name}</h3>
    <p className="mt-1 text-black">{products.description}</p>
    <p className="mt-2 text-green-700 font-bold"> {products.stock}</p>
    <p className="mt-2 text-red-600 font-bold"> {products.price}$</p>

    {/* Details Button */}
    <div className="flex justify-between mt-4">
      <button
        onClick={() => navigate(`/products/${products._id}`)}
        className="bg-gray-900 text-white w-full hover:font-bold p-2 rounded-md hover:bg-red-600 transition-colors duration-200 ease-in-out"
      >
        Details
      </button>
    </div>
  </div>
</div>

  

  );
};

export default ProductCard;
