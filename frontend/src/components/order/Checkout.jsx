import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { clearCart, setCartItems } from '../../reduxStore/cartSlice';
import Navbar from '@components/shared/Navbar';


const Checkout = () => {
  const { user } = useSelector((store) => store.auth);
  const [address, setAddress] = useState(user ? user.address : ""); 
  const [phoneNo, setPhoneNo] = useState(user?user.phoneNo : ""); 
  const { cartItems = [] } = useSelector((store) => store.cart);
 

 const dispatch=useDispatch()
  
  const navigate = useNavigate();

  const placeOrder = async () => {
    const orderData = {
      cartItems: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      address,
      phoneNo,
    };

    try {
      const response = await axios.post('https://prod-shop-v2.onrender.com/api/v1/orders/order', orderData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        toast.success('Order placed successfully!');
        dispatch(clearCart())
        console.log(cartItems)
        navigate('/'); 
      } else {
        toast.error(response.data.message || 'Failed to place order.');
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className="max-w-md mx-auto p-4">

      <div className="mb-4 mt-32">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter your address"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter your phone number"
        />
      </div>

      <button
        onClick={placeOrder}
        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
      >
        Confirm Order
      </button>
    </div>
    
    </>
  );
};

export default Checkout;
