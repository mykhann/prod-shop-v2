import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderHistory } from "../../reduxStore/orderSlice";
import { toast } from "react-toastify";

const useFetchOrderHistory = () => {
  const { orderHistory } = useSelector((store) => store.order);
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/orders/order-history", {
          withCredentials: true,
        });
        console.log(res.data)
        if (res.data.success){
            dispatch(setOrderHistory(res.data.orders))
            toast.success(res.data.message)
            
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };
    fetchOrderHistory()
  },[]);
};

export default useFetchOrderHistory;
